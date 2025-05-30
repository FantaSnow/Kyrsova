import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ScheduleService from "../../../api/services/ScheduleService";
import SubjectService from "../../../api/services/SubjectService";
import GroupService from "../../../api/services/GroupService";
import TeacherService from "../../../api/services/TeacherService";
import ClassTypeService from "../../../api/services/ClassTypeService";
import ClassNumberService from "../../../api/services/ClassNumberService";
import { useEntityDetails } from "../../../hooks/useEntityDetails";
import { EntityDetailsDialog } from "../../../components/common/EntityDetailsDialog";

const emptySchedule = {
  id: 0,
  date: "",
  auditory: "",
  connectionCode: "",
  subject_id: 0,
  teacher_id: 0,
  group_id: 0,
  class_type_id: 0,
  classnumber_id: 0,
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
      setSubjects(res.data || res)
    );
    GroupService.getAll(0, 100).then((res: any) => setGroups(res.data || res));
    TeacherService.getAll(0, 100).then((res: any) =>
      setTeachers(res.data || res)
    );
    ClassTypeService.getAll(0, 100).then((res: any) =>
      setClassTypes(res.data || res)
    );
    ClassNumberService.getAll(0, 100).then((res: any) =>
      setClassNumbers(res.data || res)
    );
  }, []);

  // Завантажити всі розклади
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

  // Створити/оновити розклад
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      if (editingId !== null) {
        await ScheduleService.update({ ...newSchedule, id: editingId });
      } else {
        await ScheduleService.create(newSchedule);
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

  // Дані для таблиці
  const getTableData = () => {
    if (tableMode === "all") return schedules;
    if (!foundSchedule) return [];
    if (Array.isArray(foundSchedule)) return foundSchedule;
    return [foundSchedule];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Тестування ScheduleService
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Форма створення/редагування */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editingId !== null ? "Редагувати розклад" : "Створити розклад"}
        </Typography>
        <TextField
          label="ID"
          value={newSchedule.id}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, id: +e.target.value })
          }
          type="number"
          fullWidth
          sx={{ mb: 2 }}
          disabled={editingId !== null}
        />
        <TextField
          label="Дата"
          value={newSchedule.date}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, date: e.target.value })
          }
          type="date"
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Аудиторія"
          value={newSchedule.auditory}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, auditory: e.target.value })
          }
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Код підключення"
          value={newSchedule.connectionCode}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, connectionCode: e.target.value })
          }
          fullWidth
          sx={{ mb: 2 }}
        />

        {/* Селектори для зв'язків */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Група</InputLabel>
              <Select
                value={newSchedule.group_id}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, group_id: e.target.value })
                }
                label="Група"
              >
                {groups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Предмет</InputLabel>
              <Select
                value={newSchedule.subject_id}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, subject_id: e.target.value })
                }
                label="Предмет"
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Тип заняття</InputLabel>
              <Select
                value={newSchedule.class_type_id}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, class_type_id: e.target.value })
                }
                label="Тип заняття"
              >
                {classTypes.map((classType) => (
                  <MenuItem key={classType.id} value={classType.id}>
                    {classType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Номер пари</InputLabel>
              <Select
                value={newSchedule.classnumber_id}
                onChange={(e) =>
                  setNewSchedule({ ...newSchedule, classnumber_id: e.target.value })
                }
                label="Номер пари"
              >
                {classNumbers.map((classNumber) => (
                  <MenuItem key={classNumber.id} value={classNumber.id}>
                    {classNumber.number}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={loading}
          sx={{ mr: 1 }}
        >
          {editingId !== null ? "Оновити" : "Створити"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setNewSchedule(emptySchedule);
            setEditingId(null);
          }}
          disabled={loading}
        >
          Скинути
        </Button>
      </Paper>

      {/* Пошук і таблиця */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Пошук розкладу
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID розкладу"
              value={findId}
              onChange={(e) => setFindId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Назва предмета"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Дата початок"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Дата кінець"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleFind}
          disabled={loading}
          sx={{ mr: 1 }}
        >
          Знайти
        </Button>
        <Button
          variant="outlined"
          onClick={() => setTableMode("all")}
          disabled={loading}
        >
          Показати всі
        </Button>

        <Table size="small" sx={{ mt: 2 }}>
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
            {getTableData().map((schedule: any) => (
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
                    id: {schedule.group_id}
                  </span>
                  {schedule.group && (
                    <>
                      <br />
                      name: {schedule.group.name}
                    </>
                  )}
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
                    id: {schedule.subject_id}
                  </span>
                  {schedule.subject && (
                    <>
                      <br />
                      name: {schedule.subject.name}
                      <br />
                      desc: {schedule.subject.desc}
                    </>
                  )}
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
                        schedule.class_type_id
                      )
                    }
                  >
                    id: {schedule.class_type_id ?? schedule.class_type?.id}
                  </span>
                  {schedule.class_type && (
                    <>
                      <br />
                      name: {schedule.class_type.name}
                    </>
                  )}
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
                    id: {schedule.teacher_id}
                  </span>
                  {schedule.teacher && (
                    <>
                      <br />
                      name: {schedule.teacher.name}
                      <br />
                      email: {schedule.teacher.email}
                      <br />
                      department_id: {schedule.teacher.department_id}
                    </>
                  )}
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
                        schedule.classnumber_id
                      )
                    }
                  >
                    id: {schedule.classnumber_id ?? schedule.classnumber?.id}
                  </span>
                  {schedule.classnumber && (
                    <>
                      <br />
                      number: {schedule.classnumber.number}
                      <br />
                      time_start: {schedule.classnumber.time_start}
                      <br />
                      time_end: {schedule.classnumber.time_end}
                    </>
                  )}
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
      <EntityDetailsDialog
        open={entityDetails.modalOpen}
        title={entityDetails.modalTitle}
        data={entityDetails.modalData}
        loading={entityDetails.loading}
        onClose={entityDetails.close}
      />
    </Box>
  );
};

export default SchedulesAdmin;