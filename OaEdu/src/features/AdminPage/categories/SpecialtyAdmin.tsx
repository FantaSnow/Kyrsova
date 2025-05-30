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
import SpecialtyService from "../../../api/services/SpecialtyService";
import DepartmentService from "../../../api/services/DepartmentService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";

const emptySpecialty = {
  id: 0,
  name: "",
  specialty_number: "",
  department_id: "",
};

type SpecialtyField = keyof typeof emptySpecialty;

const SpecialtyAdmin: React.FC = () => {
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSpecialty, setNewSpecialty] =
    useState<Record<SpecialtyField, any>>(emptySpecialty);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Пошук
  const [tableMode, setTableMode] = useState<"all" | "search">("all");
  const [searchType, setSearchType] = useState<"id" | "name">("id");
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [foundSpecialty, setFoundSpecialty] = useState<any | null>(null);

  const entityDetails = useEntityDetails();

  // Завантажити всі департаменти для селектора
  useEffect(() => {
    DepartmentService.getAll(0, 100).then((res: any) =>
      setDepartments(res.data || res)
    );
  }, []);

  // Завантажити всі спеціальності
  const fetchSpecialties = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await SpecialtyService.getAll(0, 100);
      if (Array.isArray(data)) setSpecialties(data);
      else if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as any).data)
      )
        setSpecialties((data as any).data);
      else setSpecialties([]);
    } catch {
      setError("Помилка завантаження спеціальностей");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  // Створити/оновити спеціальність
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...newSpecialty,
        specialty_number: Number(newSpecialty.specialty_number),
        department_id: Number(newSpecialty.department_id),
      };
      if (editingId !== null) {
        await SpecialtyService.update({ ...payload, id: editingId });
      } else {
        await SpecialtyService.create(payload);
      }
      setNewSpecialty(emptySpecialty);
      setEditingId(null);
      await fetchSpecialties();
    } catch {
      setError(
        editingId !== null
          ? "Помилка оновлення спеціальності"
          : "Помилка створення спеціальності"
      );
    } finally {
      setLoading(false);
    }
  };

  // Видалити спеціальність
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await SpecialtyService.delete(id);
      await fetchSpecialties();
    } catch {
      setError("Помилка видалення спеціальності");
    } finally {
      setLoading(false);
    }
  };

  // Пошук спеціальності
  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setFoundSpecialty(null);
    try {
      let data = null;
      if (searchType === "id") {
        data = await SpecialtyService.getById(Number(findId));
      } else if (searchType === "name") {
        data = await SpecialtyService.getByName(findName);
      }
      setFoundSpecialty(data);
    } catch {
      setError("Не знайдено");
    } finally {
      setLoading(false);
    }
  };

  // Мемоізовані дані для таблиці
  const tableData = useMemo(() => {
    if (tableMode === "all") return specialties;
    if (!foundSpecialty) return [];
    if (Array.isArray(foundSpecialty)) return foundSpecialty;
    return [foundSpecialty];
  }, [tableMode, specialties, foundSpecialty]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ mb: 3 }}
      >
        Тестування SpecialtyService
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Створити/оновити спеціальність</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <TextField
            label="Назва"
            value={newSpecialty.name}
            onChange={(e) =>
              setNewSpecialty({ ...newSpecialty, name: e.target.value })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <TextField
            label="Номер спеціальності"
            value={newSpecialty.specialty_number}
            onChange={(e) =>
              setNewSpecialty({
                ...newSpecialty,
                specialty_number: e.target.value,
              })
            }
            size="small"
            type="number"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Кафедра</InputLabel>
            <Select
              value={newSpecialty.department_id}
              label="Кафедра"
              onChange={(e) =>
                setNewSpecialty({
                  ...newSpecialty,
                  department_id: e.target.value,
                })
              }
            >
              {departments.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name} (id: {d.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
          {editingId !== null ? "Зберегти зміни" : "Створити спеціальність"}
        </Button>
        {editingId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewSpecialty(emptySpecialty);
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
              <MenuItem value="all">Всі спеціальності</MenuItem>
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
              <Button variant="outlined" onClick={handleFind} sx={{ ml: 2 }}>
                Знайти
              </Button>
            </>
          )}
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          {tableMode === "all" ? "Всі спеціальності" : "Результати пошуку"}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Номер спеціальності</TableCell>
              <TableCell>Кафедра</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((specialty: any) => (
              <TableRow key={specialty.id}>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Спеціальність",
                        SpecialtyService,
                        specialty.id
                      )
                    }
                  >
                    {specialty.id}
                  </span>
                </TableCell>
                <TableCell>{specialty.name}</TableCell>
                <TableCell>{specialty.specialty_number}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      specialty.department_id &&
                      entityDetails.showDetails(
                        "Кафедра",
                        DepartmentService,
                        specialty.department_id
                      )
                    }
                  >
                    {departments.find((d) => d.id === specialty.department_id)
                      ?.name || specialty.department_id}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setNewSpecialty({ ...emptySpecialty, ...specialty });
                      setEditingId(specialty.id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Оновити
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(specialty.id)}
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

export default SpecialtyAdmin;
