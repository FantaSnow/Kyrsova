import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { tableHeaders } from "../constants";
import { getRowColor } from "../utils/schedule";

interface ScheduleTableProps {
  loading: boolean;
  allPairs: number[];
  lessons: any[];
  activeColumns: string[];
  theme: any;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  loading,
  allPairs,
  lessons,
  activeColumns,
  theme,
}) => {
  const visibleHeaders = useMemo(
    () => tableHeaders.filter((h) => activeColumns.includes(h.key)),
    [activeColumns]
  );

  const lessonsMap = useMemo(() => {
    const map = new Map<number, any>();
    lessons.forEach((l) => {
      if (l.classnumber && l.classnumber.number) {
        map.set(Number(l.classnumber.number), l);
      }
    });
    return map;
  }, [lessons]);

  const getCellValue = (
    row: any,
    headerKey: string,
    pairNum: number,
    isEmpty: boolean
  ): React.ReactNode => {
    if (isEmpty) return headerKey === "id" ? pairNum : null;
    let value: any;
    switch (headerKey) {
      case "pair": // Стовпчик "Пара" (номер)
        value = row.classnumber?.number ?? "";
        break;
      case "type": // Стовпчик "Тип"
        value = row.class_type?.name ?? "";
        break;
      case "time": // Стовпчик "Час"
        value = row.classnumber
          ? `${row.classnumber.time_start.slice(
              0,
              6
            )} - ${row.classnumber.time_end.slice(0, 6)}`
          : "";
        break;
      case "code": // Стовпчик "Кодове слово"
        value = row.teacher?.connectionCode ?? "";
        break;
      default:
        value = row[headerKey];
    }
    if (typeof value === "object" && value !== null) {
      if ("name" in value) return value.name;
      return JSON.stringify(value);
    }
    return value ?? "";
  };

  const EmptyRow = ({ colSpan }: { colSpan: number }) => (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <Typography variant="bodyM" color="text.secondary">
          Немає пар на цей день
        </Typography>
      </TableCell>
    </TableRow>
  );

  return (
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
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {visibleHeaders.map((header, cellIdx) => (
                <TableCell
                  key={header.key}
                  sx={{
                    bgcolor: "secondary.secondary10",
                    textAlign: "center",
                    py: 1,
                    borderTopLeftRadius: cellIdx === 0 ? 16 : 0,
                    borderBottomLeftRadius: cellIdx === 0 ? 16 : 0,
                    borderTopRightRadius:
                      cellIdx === visibleHeaders.length - 1 ? 16 : 0,
                    borderBottomRightRadius:
                      cellIdx === visibleHeaders.length - 1 ? 16 : 0,
                  }}
                >
                  <Typography variant="buttonM">{header.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
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
          </TableHead>
          <TableBody>
            {allPairs.length === 0 ? (
              <EmptyRow colSpan={visibleHeaders.length} />
            ) : (
              allPairs.map((pairNum, idx) => {
                const row = lessonsMap.get(pairNum);
                const isEmpty = !row;
                return (
                  <React.Fragment key={pairNum}>
                    <TableRow
                      sx={{
                        background: isEmpty
                          ? theme.palette.schedule.main
                          : getRowColor(row.class_type?.name, theme),
                        "& .MuiTableCell-root": {
                          border: "none",
                        },
                      }}
                    >
                      {visibleHeaders.map((header, cellIdx) => {
                        const value = getCellValue(
                          row,
                          header.key,
                          pairNum,
                          isEmpty
                        );

                        return (
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
                            <Typography variant="bodyM">{value}</Typography>
                          </TableCell>
                        );
                      })}
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
              })
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ScheduleTable;
