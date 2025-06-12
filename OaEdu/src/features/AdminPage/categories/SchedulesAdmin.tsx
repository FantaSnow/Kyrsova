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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import ScheduleService from "../../../api/services/ScheduleService";
import SubjectService from "../../../api/services/SubjectService";
import GroupService from "../../../api/services/GroupService";
import TeacherService from "../../../api/services/TeacherService";
import ClassTypeService from "../../../api/services/ClassTypeService";
import ClassNumberService from "../../../api/services/ClassNumberService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";

const emptySchedule = {
  id: 0,
  date: "",
  auditory: "",
  connectionCode: "",
  subject_id: "",
  teacher_id: "",
  group_id: "",
  class_type: "",
  class_number_id: "",
};

type ScheduleField = keyof typeof emptySchedule;

const SchedulesAdmin: React.FC = () => {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newSchedule, setNewSchedule] =
    useState<Record<ScheduleField, string | number>>(emptySchedule);
  const [findId, setFindId] = useState("");
  const [foundSchedule, setFoundSchedule] = useState<any | null>(null);
  const [searchType, setSearchType] = useState<"id" | "subject" | "date">("id");
  const [subjectName, setSubjectName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [tableMode, setTableMode] = useState<"all" | "search">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classTypes, setClassTypes] = useState<any[]>([]);
  const [classNumbers, setClassNumbers] = useState<any[]>([]);

  // Хук для модального вікна деталей
  const entityDetails = useEntityDetails();

  // Завантаження списків для селекторів
  useEffect(() => {
    SubjectService.getAll(0, 100).then((res: any) =>
      setSubjects(Array.isArray(res) ? res : res.data || [])
    );
    GroupService.getAll(0, 100).then((res: any) =>
      setGroups(Array.isArray(res) ? res : res.data || [])
    );
    TeacherService.getAll(0, 100).then((res: any) =>
      setTeachers(Array.isArray(res) ? res : res.data || [])
    );
    ClassTypeService.getAll(0, 100).then((res: any) =>
      setClassTypes(Array.isArray(res) ? res : res.data || [])
    );
    ClassNumberService.getAll(0, 100).then((res: any) =>
      setClassNumbers(Array.isArray(res) ? res : res.data || [])
    );
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ScheduleService.getAll(0, 100);
      if (Array.isArray(data)) setSchedules(data);
      else if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as any).data)
      )
        setSchedules((data as any).data);
      else setSchedules([]);
    } catch {
      setError("Помилка завантаження розкладів");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  function cleanSchedulePayload(schedule: any) {
    return {
      id: schedule.id,
      date: schedule.date,
      auditory: schedule.auditory,
      connectionCode: schedule.connectionCode,
      subject_id: Number(schedule.subject_id) || 0,
      group_id: Number(schedule.group_id) || 0,
      teacher_id: Number(schedule.teacher_id) || 0,
      class_type: Number(schedule.class_type) || 0,
      class_number_id: Number(schedule.class_number_id) || 0,
    };
  }

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = cleanSchedulePayload(newSchedule);
      if (editingId !== null) {
        await ScheduleService.update({ ...payload, id: editingId });
      } else {
        await ScheduleService.create(payload);
      }
      setNewSchedule(emptySchedule);
      setEditingId(null);
      fetchSchedules();
    } catch {
      setError(
        editingId !== null
          ? "Помилка оновлення розкладу"
          : "Помилка створення розкладу"
      );
    } finally {
      setLoading(false);
    }
  };

  // Видалити розклад
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await ScheduleService.delete(id);
      fetchSchedules();
    } catch {
      setError("Помилка видалення розкладу");
    } finally {
      setLoading(false);
    }
  };

  // Пошук розкладу
  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setFoundSchedule(null);
    try {
      let data = null;
      if (searchType === "id") {
        data = await ScheduleService.getById(Number(findId));
      } else if (searchType === "subject") {
        data = await ScheduleService.getBySubjectName(
          subjectName,
          dateStart,
          dateEnd
        );
      } else if (searchType === "date") {
        data = await ScheduleService.getByDates(dateStart, dateEnd);
      }
      setFoundSchedule(data);
    } catch {
      setError("Не знайдено");
    } finally {
      setLoading(false);
    }
  };

  // Мемоізовані дані для таблиці
  const tableData = useMemo(() => {
    if (tableMode === "all") return schedules;
    if (!foundSchedule) return [];
    if (Array.isArray(foundSchedule)) return foundSchedule;
    return [foundSchedule];
  }, [tableMode, schedules, foundSchedule]);

  // Відображення
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h5"
        color="text.primary"
        align="center"
        sx={{ mb: 3 }}
      >
        Адміністрування розкладів
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Створити/оновити розклад</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          <TextField
            label="Дата"
            type="date"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <TextField
            label="Аудиторія"
            value={newSchedule.auditory}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, auditory: e.target.value })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <TextField
            label="Код підключення"
            value={newSchedule.connectionCode}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, connectionCode: e.target.value })
            }
            size="small"
            fullWidth
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          />
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Предмет</InputLabel>
            <Select
              value={newSchedule.subject_id}
              label="Предмет"
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  subject_id: e.target.value,
                })
              }
            >
              <MenuItem value="">Не вибрано</MenuItem>
              {subjects.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name} (id: {s.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Група</InputLabel>
            <Select
              value={newSchedule.group_id}
              label="Група"
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  group_id: e.target.value,
                })
              }
            >
              <MenuItem value="">Не вибрано</MenuItem>
              {groups.map((g) => (
                <MenuItem key={g.id} value={g.id}>
                  {g.name} (id: {g.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Викладач</InputLabel>
            <Select
              value={newSchedule.teacher_id}
              label="Викладач"
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  teacher_id: e.target.value,
                })
              }
            >
              <MenuItem value="">Не вибрано</MenuItem>
              {teachers.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name} (id: {t.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Тип заняття</InputLabel>
            <Select
              value={newSchedule.class_type}
              label="Тип заняття"
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  class_type: e.target.value,
                })
              }
            >
              <MenuItem value="">Не вибрано</MenuItem>
              {classTypes.map((ct) => (
                <MenuItem key={ct.id} value={ct.id}>
                  {ct.name} (id: {ct.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            size="small"
            sx={{ minWidth: 200, flex: "1 1 200px" }}
          >
            <InputLabel>Пара</InputLabel>
            <Select
              value={newSchedule.class_number_id}
              label="Пара"
              onChange={(e) =>
                setNewSchedule({
                  ...newSchedule,
                  class_number_id: e.target.value,
                })
              }
            >
              <MenuItem value="">Не вибрано</MenuItem>
              {classNumbers.map((cn) => (
                <MenuItem key={cn.id} value={cn.id}>
                  {cn.number} ({cn.time_start}-{cn.time_end}) id: {cn.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
          {editingId !== null ? "Зберегти зміни" : "Створити розклад"}
        </Button>
        {editingId !== null && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setNewSchedule(emptySchedule);
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
              <MenuItem value="all">Всі розклади</MenuItem>
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
                  <MenuItem value="subject">За назвою предмета</MenuItem>
                  <MenuItem value="date">За датою</MenuItem>
                </Select>
              </FormControl>
              {tableMode === "search" && searchType === "id" && (
                <TextField
                  label="ID"
                  value={findId}
                  onChange={(e) => setFindId(e.target.value)}
                  size="small"
                  sx={{ mr: 2 }}
                />
              )}
              {tableMode === "search" && searchType === "subject" && (
                <>
                  <TextField
                    label="Назва предмета"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <TextField
                    label="Дата початку"
                    type="date"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    size="small"
                    sx={{ mr: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Дата кінця"
                    type="date"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    size="small"
                    sx={{ mr: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}
              {tableMode === "search" && searchType === "date" && (
                <>
                  <TextField
                    label="Дата початку"
                    type="date"
                    value={dateStart}
                    onChange={(e) => setDateStart(e.target.value)}
                    size="small"
                    sx={{ mr: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Дата кінця"
                    type="date"
                    value={dateEnd}
                    onChange={(e) => setDateEnd(e.target.value)}
                    size="small"
                    sx={{ mr: 2 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </>
              )}
              <Button variant="outlined" onClick={handleFind} sx={{ ml: 2 }}>
                Знайти
              </Button>
            </>
          )}
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          {tableMode === "all" ? "Всі розклади" : "Результати пошуку"}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Аудиторія</TableCell>
              <TableCell>Код підключення</TableCell>
              <TableCell>Група</TableCell>
              <TableCell>Предмет</TableCell>
              <TableCell>Тип заняття</TableCell>
              <TableCell>Викладач</TableCell>
              <TableCell>Пара</TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((schedule: any) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.id}</TableCell>
                <TableCell>{schedule.date}</TableCell>
                <TableCell>{schedule.auditory}</TableCell>
                <TableCell>{schedule.connectionCode}</TableCell>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Група",
                        GroupService,
                        schedule.group_id
                      )
                    }
                  >
                    {schedule.group?.name || ""}
                  </span>
                </TableCell>
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
                        schedule.subject_id
                      )
                    }
                  >
                    {schedule.subject?.name || ""}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Тип заняття",
                        ClassTypeService,
                        schedule.class_type_id || schedule.class_type
                      )
                    }
                  >
                    {schedule.class_type?.name || ""}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Викладач",
                        TeacherService,
                        schedule.teacher_id
                      )
                    }
                  >
                    {schedule.teacher?.name || ""}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() =>
                      entityDetails.showDetails(
                        "Пара",
                        ClassNumberService,
                        schedule.class_number_id
                      )
                    }
                  >
                    {schedule.classnumber?.number || ""}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setNewSchedule({
                        ...emptySchedule,
                        ...schedule,
                      });
                      setEditingId(schedule.id);
                    }}
                    sx={{ mr: 1 }}
                  >
                    Оновити
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(schedule.id)}
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

export default SchedulesAdmin;
