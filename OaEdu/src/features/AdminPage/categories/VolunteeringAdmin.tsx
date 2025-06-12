import React, { useEffect, useMemo, useState } from "react";
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
import VolunteeringService from "../../../api/services/VolunteeringService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";

const emptyVolunteering = {
  id: 0,
  title: "",
  description: "",
  date: "",
  location: "",
  org: "",
  orgLogo: "",
  image: "",
  category: "",
  is_active: true,
};

type VolunteeringField = keyof typeof emptyVolunteering;

const VolunteeringAdmin: React.FC = () => {
  const [vols, setVols] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newVol, setNewVol] =
    useState<Record<VolunteeringField, any>>(emptyVolunteering);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Пошук
  const [tableMode, setTableMode] = useState<"all" | "search">("all");
  const [searchType, setSearchType] = useState<"id" | "title">("id");
  const [findId, setFindId] = useState("");
  const [findTitle, setFindTitle] = useState("");
  const [foundVol, setFoundVol] = useState<any | null>(null);

  const entityDetails = useEntityDetails();

  // Завантажити всі волонтерства
  const fetchVols = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await VolunteeringService.getAll(0, 100);
      if (Array.isArray(data)) setVols(data);
      else if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as any).data)
      )
        setVols((data as any).data);
      else setVols([]);
    } catch {
      setError("Помилка завантаження волонтерств");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVols();
  }, []);

  // Створити/оновити волонтерство
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (editingId !== null) {
        await VolunteeringService.update({ ...newVol, id: editingId });
      } else {
        await VolunteeringService.create(newVol);
      }
      setNewVol(emptyVolunteering);
      setEditingId(null);
      await fetchVols();
    } catch {
      setError(
        editingId !== null
          ? "Помилка оновлення волонтерства"
          : "Помилка створення волонтерства"
      );
    } finally {
      setLoading(false);
    }
  };

  // Видалити волонтерство
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await VolunteeringService.delete(id);
      await fetchVols();
    } catch {
      setError("Помилка видалення волонтерства");
    } finally {
      setLoading(false);
    }
  };

  // Пошук волонтерства
  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setFoundVol(null);
    try {
      let data = null;
      if (searchType === "id") {
        data = await VolunteeringService.getById(Number(findId));
      } else if (searchType === "title") {
        const all = await VolunteeringService.getAll(0, 100);
        const arr = Array.isArray(all)
          ? all
          : all &&
            typeof all === "object" &&
            "data" in all &&
            Array.isArray((all as any).data)
          ? (all as any).data
          : [];
        data = arr.find((v: any) => v.title === findTitle);
      }
      setFoundVol(data);
    } catch {
      setError("Не знайдено");
    } finally {
      setLoading(false);
    }
  };

  // Мемоізовані дані для таблиці
  const tableData = useMemo(() => {
    if (tableMode === "all") return vols;
    if (!foundVol) return [];
    if (Array.isArray(foundVol)) return foundVol;
    return [foundVol];
  }, [tableMode, vols, foundVol]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ mb: 3 }}
      >
        Адміністрування волонтерств
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Створити/оновити волонтерство</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <TextField
            label="Назва"
            value={newVol.title}
            onChange={(e) => setNewVol({ ...newVol, title: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <TextField
            label="Опис"
            value={newVol.description}
            onChange={(e) =>
              setNewVol({ ...newVol, description: e.target.value })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <TextField
            label="Дата"
            value={newVol.date}
            onChange={(e) => setNewVol({ ...newVol, date: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <TextField
            label="Локація"
            value={newVol.location}
            onChange={(e) => setNewVol({ ...newVol, location: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <TextField
            label="Організатор"
            value={newVol.org}
            onChange={(e) => setNewVol({ ...newVol, org: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <TextField
            label="Лого організатора (URL)"
            value={newVol.orgLogo}
            onChange={(e) => setNewVol({ ...newVol, orgLogo: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <TextField
            label="Зображення (URL)"
            value={newVol.image}
            onChange={(e) => setNewVol({ ...newVol, image: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <TextField
            label="Категорія"
            value={newVol.category}
            onChange={(e) => setNewVol({ ...newVol, category: e.target.value })}
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          >
            <InputLabel>Активний</InputLabel>
            <Select
              value={newVol.is_active ? "true" : "false"}
              label="Активний"
              onChange={(e) =>
                setNewVol({ ...newVol, is_active: e.target.value === "true" })
              }
            >
              <MenuItem value="true">Так</MenuItem>
              <MenuItem value="false">Ні</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
          {editingId !== null ? "Зберегти зміни" : "Створити волонтерство"}
        </Button>
        {editingId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewVol(emptyVolunteering);
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
              <MenuItem value="all">Всі</MenuItem>
              <MenuItem value="search">Пошук</MenuItem>
            </Select>
          </FormControl>
          {tableMode === "search" && (
            <>
              <FormControl sx={{ minWidth: 120, mr: 2 }} size="small">
                <InputLabel>Тип пошуку</InputLabel>
                <Select
                  value={searchType}
                  label="Тип пошуку"
                  onChange={(e) => setSearchType(e.target.value as any)}
                >
                  <MenuItem value="id">ID</MenuItem>
                  <MenuItem value="title">Назва</MenuItem>
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
              {searchType === "title" && (
                <TextField
                  label="Назва"
                  value={findTitle}
                  onChange={(e) => setFindTitle(e.target.value)}
                  size="small"
                  sx={{ mr: 2 }}
                />
              )}
              <Button variant="contained" onClick={handleFind}>
                Знайти
              </Button>
            </>
          )}
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          {tableMode === "all" ? "Всі волонтерства" : "Результати пошуку"}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Опис</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Локація</TableCell>
              <TableCell>Організатор</TableCell>
              <TableCell>Категорія</TableCell>
              <TableCell>Активний</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((vol: any) => (
              <TableRow key={vol.id}>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Волонтерство",
                        VolunteeringService,
                        vol.id
                      )
                    }
                  >
                    {vol.id}
                  </span>
                </TableCell>
                <TableCell>{vol.title}</TableCell>
                <TableCell>{vol.description}</TableCell>
                <TableCell>{vol.date}</TableCell>
                <TableCell>{vol.location}</TableCell>
                <TableCell>{vol.org}</TableCell>
                <TableCell>{vol.category}</TableCell>
                <TableCell>{vol.is_active ? "Так" : "Ні"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setNewVol({ ...emptyVolunteering, ...vol });
                      setEditingId(vol.id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Оновити
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(vol.id)}
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

export default VolunteeringAdmin;
