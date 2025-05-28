import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Дні тижня
const days = [
  "Понеділок 26.05.2025",
  "Вівторок 27.05.2025",
  "Середа 28.05.2025",
  "Четвер 29.05.2025",
  "Пʼятниця 30.05.2025",
  "Субота 31.05.2025",
  "Неділя 01.06.2025",
];

// Всі колонки таблиці
const tableHeaders = [
  { key: "id", label: "#" },
  { key: "time", label: "Час" },
  { key: "subject", label: "Дисципліна" },
  { key: "auditory", label: "Аудиторія" },
  { key: "type", label: "Тип" },
  { key: "teacher", label: "Викладач" },
  { key: "group", label: "Групи" },
  { key: "pair", label: "Пари" },
  { key: "code", label: "Кодове слово" },
];

// Дані для прикладу (отримувати з бекенду)
const lessons = [
  {
    id: 1,
    time: "9:00 - 10:40",
    subject: "Криптограф. захист інформації",
    auditory: "23",
    type: "Лабораторна",
    teacher: "Коцюк Юрій Анатолійович",
    group: "КІ-33",
    pair: "2/25",
    code: "yuriykotsyuk",
  },
  {
    id: 2,
    time: "10:55 - 12:35",
    subject: "Вища математика",
    auditory: "12",
    type: "Лекція",
    teacher: "Іваненко І.І.",
    group: "КІ-33",
    pair: "3/25",
    code: "math2025",
  },
  {
    id: 4,
    time: "12:50 - 14:30",
    subject: "Програмування",
    auditory: "15",
    type: "Практика",
    teacher: "Петров П.П.",
    group: "КІ-33",
    pair: "4/25",
    code: "prog2025",
  },
];

const getRowColor = (type: string, theme: any) => {
  if (type === "Лекція") return theme.palette.schedule.lecture;
  if (type === "Лабораторна") return theme.palette.schedule.Lab;
  if (type === "Практика") return theme.palette.schedule.Prac;
  return "#f0f0f0";
};

const SchedulePage: React.FC = () => {
  const theme = useTheme();
  const [activeDay, setActiveDay] = useState(1);

  const [activeColumns, setActiveColumns] = useState<string[]>(
    tableHeaders.map((h) => h.key)
  );

  const handleToggleColumn = (key: string) => {
    setActiveColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const maxPair = Math.max(...lessons.map((l) => Number(l.id)));
  const allPairs = Array.from({ length: maxPair }, (_, i) => i + 1);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Date navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          mt: 10,
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{ mx: 2, boxShadow: 0, minWidth: 40 }}
        >
          {"<"}
        </Button>
        <Box
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: "secondary.secondary20",
            borderRadius: 2,
            textAlign: "center",
            boxShadow: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="buttonL" color="text.primary">
            26.05.2025 – 31.05.2025
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{ mx: 2, minWidth: 40, boxShadow: 0 }}
        >
          {">"}
        </Button>
      </Box>

      {/* Days of week */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            bgcolor: "secondary.secondary20",
            borderRadius: "18px",
            boxShadow: "0px 4px 5px 2px #00000024",
            px: 2,
            py: 1,
            width: "100%",
            maxWidth: 1100,
            alignItems: "center",
            gap: 1,
          }}
        >
          {days.map((day, idx) => {
            const [dow, date] = day.split(" ");
            return (
              <Button
                key={day}
                onClick={() => setActiveDay(idx)}
                disableRipple
                sx={{
                  flex: 1,
                  borderRadius: "10px",
                  background:
                    idx === activeDay
                      ? theme.palette.secondary.secondary30
                      : "transparent",
                  color: "text.primary",
                  transition: "background 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    background: theme.palette.secondary.secondary40,
                  },
                }}
              >
                <Typography variant="buttonM" color="text.primary">
                  {dow}
                </Typography>
                <Typography variant="buttonM" color="text.primary">
                  {date}
                </Typography>
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* Schedule Table */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1332,
            borderRadius: 5,
            boxShadow: "0px 4px 5px 2px #00000024",
            px: 2,
            py: 1,
            bgcolor: "secondary.secondary10",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders
                  .filter((h) => activeColumns.includes(h.key))
                  .map((header, cellIdx, arr) => (
                    <TableCell
                      key={header.key}
                      sx={{
                        bgcolor: "secondary.secondary10",
                        textAlign: "center",
                        py: 1,
                        borderTopLeftRadius: cellIdx === 0 ? 16 : 0,
                        borderBottomLeftRadius: cellIdx === 0 ? 16 : 0,
                        borderTopRightRadius:
                          cellIdx === arr.length - 1 ? 16 : 0,
                        borderBottomRightRadius:
                          cellIdx === arr.length - 1 ? 16 : 0,
                      }}
                    >
                      <Typography variant="buttonM">{header.label}</Typography>
                    </TableCell>
                  ))}
              </TableRow>
              <TableRow>
                <TableCell
                  colSpan={activeColumns.length}
                  sx={{
                    height: 12,
                    p: 0,
                    border: "none",
                    background: "transparent",
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {allPairs.map((pairNum, idx) => {
                const row = lessons.find((l) => Number(l.id) === pairNum);
                const visibleHeaders = tableHeaders.filter((h) =>
                  activeColumns.includes(h.key)
                );
                const isEmpty = !row;
                return (
                  <React.Fragment key={pairNum}>
                    <TableRow
                      sx={{
                        background: isEmpty
                          ? theme.palette.schedule.main
                          : getRowColor(row?.type, theme),
                        "& .MuiTableCell-root": {
                          border: "none",
                        },
                      }}
                    >
                      {visibleHeaders.map((header, cellIdx) => (
                        <TableCell
                          key={header.key}
                          align="center"
                          sx={{
                            borderTopLeftRadius: cellIdx === 0 ? 16 : 0,
                            borderBottomLeftRadius: cellIdx === 0 ? 16 : 0,
                            borderTopRightRadius:
                              cellIdx === visibleHeaders.length - 1 ? 16 : 0,
                            borderBottomRightRadius:
                              cellIdx === visibleHeaders.length - 1 ? 16 : 0,
                            background: "inherit",
                            px: 1.5,
                            py: 1.2,
                          }}
                        >
                          {isEmpty ? (
                            header.key === "id" ? (
                              <Typography variant="bodyM" color="text.primary">
                                {pairNum}
                              </Typography>
                            ) : null
                          ) : header.key === "pair" ? (
                            <Button variant="text" sx={{ minWidth: 0, p: 0 }}>
                              <Typography variant="bodyM">
                                {row[header.key as keyof typeof row]}
                              </Typography>
                            </Button>
                          ) : (
                            <Typography variant="bodyM">
                              {row[header.key as keyof typeof row]}
                            </Typography>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {idx < allPairs.length - 1 && (
                      <TableRow>
                        <TableCell
                          colSpan={visibleHeaders.length}
                          sx={{
                            height: 12,
                            p: 0,
                            border: "none",
                            background: "transparent",
                          }}
                        />
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Filters */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            bgcolor: "secondary.secondary10",
            p: 2,
            borderRadius: 3,
            boxShadow: "0px 4px 5px 2px #00000024",
            minWidth: 400,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {tableHeaders.map((header) => (
            <Box
              key={header.key}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Checkbox
                checked={activeColumns.includes(header.key)}
                onChange={() => handleToggleColumn(header.key)}
                size="small"
                sx={{
                  color: theme.palette.primary.primary50,
                  "&.Mui-checked": {
                    color: theme.palette.primary.primary50,
                  },
                }}
              />
              <Typography variant="bodyS" color="text.primary">
                {header.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
