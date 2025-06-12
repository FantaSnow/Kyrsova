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
import ClassNumberService from "../../../api/services/ClassNumberService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";
import { toIsoTime } from "../../../utils/date";

const emptyClassNumber = {
  id: 0,
  number: "",
  time_start: "",
  time_end: "",
};

type ClassNumberField = keyof typeof emptyClassNumber;

const ClassNumberAdmin: React.FC = () => {
  const [classNumbers, setClassNumbers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newClassNumber, setNewClassNumber] =
    useState<Record<ClassNumberField, any>>(emptyClassNumber);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Пошук
  const [tableMode, setTableMode] = useState<"all" | "search">("all");
  const [searchType, setSearchType] = useState<"id" | "number">("id");
  const [findId, setFindId] = useState("");
  const [findNumber, setFindNumber] = useState("");
  const [foundClassNumber, setFoundClassNumber] = useState<any | null>(null);

  const entityDetails = useEntityDetails();

  // Завантажити всі номери занять
  const fetchClassNumbers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ClassNumberService.getAll(0, 100);
      if (Array.isArray(data)) setClassNumbers(data);
      else if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as any).data)
      )
        setClassNumbers((data as any).data);
      else setClassNumbers([]);
    } catch {
      setError("Помилка завантаження номерів занять");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassNumbers();
  }, []);

  // Створити/оновити номер заняття
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...newClassNumber,
        number: Number(newClassNumber.number),
        time_start: toIsoTime(newClassNumber.time_start?.slice(0, 5)),
        time_end: toIsoTime(newClassNumber.time_end?.slice(0, 5)),
      };
      if (editingId !== null) {
        await ClassNumberService.update({ ...payload, id: editingId });
      } else {
        await ClassNumberService.create(payload);
      }
      setNewClassNumber(emptyClassNumber);
      setEditingId(null);
      await fetchClassNumbers();
    } catch {
      setError(
        editingId !== null
          ? "Помилка оновлення номера заняття"
          : "Помилка створення номера заняття"
      );
    } finally {
      setLoading(false);
    }
  };

  // Видалити номер заняття
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await ClassNumberService.delete(id);
      await fetchClassNumbers();
    } catch {
      setError("Помилка видалення номера заняття");
    } finally {
      setLoading(false);
    }
  };

  // Пошук номера заняття
  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setFoundClassNumber(null);
    try {
      let data = null;
      if (searchType === "id") {
        data = await ClassNumberService.getById(Number(findId));
      } else if (searchType === "number") {
        const all = await ClassNumberService.getAll(0, 100);
        // Явно вказуємо тип для all
        const arr = Array.isArray(all)
          ? all
          : Array.isArray((all as any).data)
          ? (all as any).data
          : [];
        data = arr.find((d: any) => String(d.number) === findNumber);
      }
      setFoundClassNumber(data);
    } catch {
      setError("Не знайдено");
    } finally {
      setLoading(false);
    }
  };

  // Мемоізовані дані для таблиці
  const tableData = useMemo(() => {
    if (tableMode === "all") return classNumbers;
    if (!foundClassNumber) return [];
    if (Array.isArray(foundClassNumber)) return foundClassNumber;
    return [foundClassNumber];
  }, [tableMode, classNumbers, foundClassNumber]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ mb: 3 }}
      >
        Адміністрування номерів занять
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Створити/оновити номер заняття</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <TextField
            label="Номер"
            value={newClassNumber.number}
            onChange={(e) =>
              setNewClassNumber({ ...newClassNumber, number: e.target.value })
            }
            size="small"
            type="number"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
          />
          <TextField
            label="Час початку"
            type="time"
            value={
              newClassNumber.time_start
                ? newClassNumber.time_start.slice(0, 5)
                : ""
            }
            onChange={(e) =>
              setNewClassNumber({
                ...newClassNumber,
                time_start: e.target.value + ":00",
              })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 1 }}
          />
          <TextField
            label="Час завершення"
            type="time"
            value={
              newClassNumber.time_end ? newClassNumber.time_end.slice(0, 5) : ""
            }
            onChange={(e) =>
              setNewClassNumber({
                ...newClassNumber,
                time_end: e.target.value + ":00",
              })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 120, flex: "1 1 120px" }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 1 }}
          />
        </Box>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
          {editingId !== null ? "Зберегти зміни" : "Створити номер заняття"}
        </Button>
        {editingId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewClassNumber(emptyClassNumber);
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
              <MenuItem value="all">Всі номери занять</MenuItem>
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
                  <MenuItem value="number">За номером</MenuItem>
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
              {searchType === "number" && (
                <TextField
                  label="Номер"
                  value={findNumber}
                  onChange={(e) => setFindNumber(e.target.value)}
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
          {tableMode === "all" ? "Всі номери занять" : "Результати пошуку"}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Номер</TableCell>
              <TableCell>Час початку</TableCell>
              <TableCell>Час завершення</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((classNumber: any) => (
              <TableRow key={classNumber.id}>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Номер заняття",
                        ClassNumberService,
                        classNumber.id
                      )
                    }
                  >
                    {classNumber.id}
                  </span>
                </TableCell>
                <TableCell>{classNumber.number}</TableCell>
                <TableCell>
                  {classNumber.time_start
                    ? classNumber.time_start.slice(0, 5)
                    : ""}
                </TableCell>
                <TableCell>
                  {classNumber.time_end ? classNumber.time_end.slice(0, 5) : ""}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setNewClassNumber({
                        ...emptyClassNumber,
                        ...classNumber,
                      });
                      setEditingId(classNumber.id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Оновити
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(classNumber.id)}
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

export default ClassNumberAdmin;
