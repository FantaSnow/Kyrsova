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
import SubjectService from "../../../api/services/SubjectService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";

const emptySubject = {
  id: 0,
  name: "",
  desc: "",
};

type SubjectField = keyof typeof emptySubject;

const SubjectAdmin: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSubject, setNewSubject] =
    useState<Record<SubjectField, any>>(emptySubject);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Пошук
  const [tableMode, setTableMode] = useState<"all" | "search">("all");
  const [searchType, setSearchType] = useState<"id" | "name">("id");
  const [findId, setFindId] = useState("");
  const [findName, setFindName] = useState("");
  const [foundSubject, setFoundSubject] = useState<any | null>(null);

  const entityDetails = useEntityDetails();

  // Завантажити всі предмети
  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await SubjectService.getAll(0, 100);
      if (Array.isArray(data)) setSubjects(data);
      else if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as any).data)
      )
        setSubjects((data as any).data);
      else setSubjects([]);
    } catch {
      setError("Помилка завантаження предметів");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Створити/оновити предмет
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (editingId !== null) {
        await SubjectService.update({ ...newSubject, id: editingId });
      } else {
        await SubjectService.create(newSubject);
      }
      setNewSubject(emptySubject);
      setEditingId(null);
      await fetchSubjects();
    } catch {
      setError(
        editingId !== null
          ? "Помилка оновлення предмета"
          : "Помилка створення предмета"
      );
    } finally {
      setLoading(false);
    }
  };

  // Видалити предмет
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await SubjectService.delete(id);
      await fetchSubjects();
    } catch {
      setError("Помилка видалення предмета");
    } finally {
      setLoading(false);
    }
  };

  // Пошук предмета
  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setFoundSubject(null);
    try {
      let data = null;
      if (searchType === "id") {
        data = await SubjectService.getById(Number(findId));
      } else if (searchType === "name") {
        data = await SubjectService.getByName(findName);
      }
      setFoundSubject(data);
    } catch {
      setError("Не знайдено");
    } finally {
      setLoading(false);
    }
  };

  // Мемоізовані дані для таблиці
  const tableData = useMemo(() => {
    if (tableMode === "all") return subjects;
    if (!foundSubject) return [];
    if (Array.isArray(foundSubject)) return foundSubject;
    return [foundSubject];
  }, [tableMode, subjects, foundSubject]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ mb: 3 }}
      >
        Адміністрування предметів
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Створити/оновити предмет</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <TextField
            label="Назва"
            value={newSubject.name}
            onChange={(e) =>
              setNewSubject({ ...newSubject, name: e.target.value })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <TextField
            label="Опис"
            value={newSubject.desc}
            onChange={(e) =>
              setNewSubject({ ...newSubject, desc: e.target.value })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
        </Box>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
          {editingId !== null ? "Зберегти зміни" : "Створити предмет"}
        </Button>
        {editingId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewSubject(emptySubject);
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
              <MenuItem value="all">Всі предмети</MenuItem>
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
          {tableMode === "all" ? "Всі предмети" : "Результати пошуку"}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Назва</TableCell>
              <TableCell>Опис</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((subject: any) => (
              <TableRow key={subject.id}>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Предмет",
                        SubjectService,
                        subject.id
                      )
                    }
                  >
                    {subject.id}
                  </span>
                </TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.desc}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setNewSubject({ ...emptySubject, ...subject });
                      setEditingId(subject.id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Оновити
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(subject.id)}
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

export default SubjectAdmin;
