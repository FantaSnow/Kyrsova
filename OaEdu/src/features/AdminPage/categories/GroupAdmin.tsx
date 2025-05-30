import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import GroupService from "../../../api/services/GroupService";
import SpecialtyService from "../../../api/services/SpecialtyService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";

const emptyGroup = {
  id: 0,
  name: "",
  specialty_id: "",
};

type GroupField = keyof typeof emptyGroup;

const GroupAdmin: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGroup, setNewGroup] = useState<Record<GroupField, any>>(emptyGroup);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Пошук
  const [tableMode, setTableMode] = useState<"all" | "search">("all");
  const [searchType, setSearchType] = useState<"id" | "name" | "specialty_id">(
    "id"
  );
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [findSpecialtyId, setFindSpecialtyId] = useState("");
  const [foundGroup, setFoundGroup] = useState<any | null>(null);

  const entityDetails = useEntityDetails();

  // Завантажити всі спеціальності для селектора
  useEffect(() => {
    SpecialtyService.getAll(0, 100).then((res: any) =>
      setSpecialties(res.data || res)
    );
  }, []);

  // Завантажити всі групи
  const fetchGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GroupService.getAll(0, 100);
      if (Array.isArray(data)) setGroups(data);
      else if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as any).data)
      )
        setGroups((data as any).data);
      else setGroups([]);
    } catch {
      setError("Помилка завантаження груп");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // Створити/оновити групу
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...newGroup,
        specialty_id: Number(newGroup.specialty_id),
      };
      if (editingId !== null) {
        await GroupService.update({ ...payload, id: editingId });
      } else {
        await GroupService.create(payload);
      }
      setNewGroup(emptyGroup);
      setEditingId(null);
      await fetchGroups();
    } catch {
      setError(
        editingId !== null
          ? "Помилка оновлення групи"
          : "Помилка створення групи"
      );
    } finally {
      setLoading(false);
    }
  };

  // Видалити групу
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await GroupService.delete(id);
      await fetchGroups();
    } catch {
      setError("Помилка видалення групи");
    } finally {
      setLoading(false);
    }
  };

  // Пошук групи
  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setFoundGroup(null);
    try {
      let data = null;
      if (searchType === "id") {
        data = await GroupService.getById(Number(findId));
      } else if (searchType === "name") {
        data = await GroupService.getByName(findName);
      } else if (searchType === "specialty_id") {
        data = await GroupService.getBySpecialty(Number(findSpecialtyId));
        if (data && data.data) data = data.data;
      }
      setFoundGroup(data);
    } catch {
      setError("Не знайдено");
    } finally {
      setLoading(false);
    }
  };

  // Мемоізовані дані для таблиці
  const tableData = useMemo(() => {
    if (tableMode === "all") return groups;
    if (!foundGroup) return [];
    if (Array.isArray(foundGroup)) return foundGroup;
    return [foundGroup];
  }, [tableMode, groups, foundGroup]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ mb: 3 }}
      >
        Тестування GroupService
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Створити/оновити групу</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <TextField
            label="Назва"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Спеціальність</InputLabel>
            <Select
              value={newGroup.specialty_id}
              label="Спеціальність"
              onChange={(e) =>
                setNewGroup({
                  ...newGroup,
                  specialty_id: e.target.value,
                })
              }
            >
              {specialties.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name} ({s.specialty_number}) - id: {s.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
          {editingId !== null ? "Зберегти зміни" : "Створити групу"}
        </Button>
        {editingId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewGroup(emptyGroup);
              setEditingId(null);
            }}
            sx={{ mt: 2 }}
          >
            Скасувати редагування
          </Button>
        )}
      </Paper>

      {/* Пошук і таблиця */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FormControl sx={{ minWidth: 180, mr: 2 }} size="small">
            <InputLabel>Режим</InputLabel>
            <Select
              value={tableMode}
              label="Режим"
              onChange={(e) => setTableMode(e.target.value as any)}
            >
              <MenuItem value="all">Всі групи</MenuItem>
              <MenuItem value="search">Пошук</MenuItem>
            </Select>
          </FormControl>
          {tableMode === "search" && (
            <>
              <FormControl sx={{ minWidth: 180, mr: 2 }} size="small">
                <InputLabel>Тип пошуку</InputLabel>
                <Select
                  value={searchType}
                  label="Тип пошуку"
                  onChange={(e) => setSearchType(e.target.value as any)}
                >
                  <MenuItem value="id">За ID</MenuItem>
                  <MenuItem value="name">За назвою</MenuItem>
                  <MenuItem value="specialty_id">За спеціальністю</MenuItem>
                </Select>
              </FormControl>
              {searchType === "id" && (
                <TextField
                  label="ID"
                  value={findId}
                  onChange={(e) => setFindId(e.target.value)}
                  size="small"
                  sx={{ mr: 2 }}
                />
              )}
              {searchType === "name" && (
                <TextField
                  label="Назва"
                  value={findName}
                  onChange={(e) => setFindName(e.target.value)}
                  size="small"
                  sx={{ mr: 2 }}
                />
              )}
              {searchType === "specialty_id" && (
                <FormControl sx={{ minWidth: 180, mr: 2 }} size="small">
                  <InputLabel>Спеціальність</InputLabel>
                  <Select
                    value={findSpecialtyId}
                    label="Спеціальність"
                    onChange={(e) => setFindSpecialtyId(e.target.value)}
                  >
                    {specialties.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.name} ({s.specialty_number}) - id: {s.id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Button variant="outlined" onClick={handleFind} sx={{ ml: 2 }}>
                Знайти
              </Button>
            </>
          )}
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          {tableMode === "all" ? "Всі групи" : "Результати пошуку"}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Спеціальність</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((group: any) => (
              <TableRow key={group.id}>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails("Група", GroupService, group.id)
                    }
                  >
                    {group.id}
                  </span>
                </TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      group.specialty_id &&
                      entityDetails.showDetails(
                        "Спеціальність",
                        SpecialtyService,
                        group.specialty_id
                      )
                    }
                  >
                    {group.specialty?.name || group.specialty_id}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setNewGroup({ ...emptyGroup, ...group });
                      setEditingId(group.id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Оновити
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(group.id)}
                  >
                    Видалити
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Модальне вікно для деталей */}
      <Dialog
        open={entityDetails.modalOpen}
        onClose={entityDetails.close}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{entityDetails.modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <pre style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>
              {entityDetails.loading
                ? "Завантаження..."
                : entityDetails.modalData
                ? JSON.stringify(entityDetails.modalData, null, 2)
                : "Немає даних"}
            </pre>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={entityDetails.close}>Закрити</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GroupAdmin;
