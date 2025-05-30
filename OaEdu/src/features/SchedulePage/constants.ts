export const weekDays = [
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "Пʼятниця",
  "Субота",
  "Неділя",
];

export const tableHeaders = [
  {
    key: "id",
    label: "#",
    render: (row: any, pairNum: number) => row.classnumber?.id ?? pairNum,
  },
  {
    key: "time",
    label: "Час",
    render: (row: any) =>
      row.classnumber
        ? `${row.classnumber.time_start} - ${row.classnumber.time_end}`
        : "",
  },
  {
    key: "subject",
    label: "Дисципліна",
    render: (row: any) => row.subject?.name ?? "",
  },
  {
    key: "auditory",
    label: "Аудиторія",
    render: (row: any) => row.auditory ?? "",
  },
  {
    key: "type",
    label: "Тип",
    render: (row: any) => row.class_type?.name ?? "",
  },
  {
    key: "teacher",
    label: "Викладач",
    render: (row: any) => row.teacher?.name ?? "",
  },
  {
    key: "group",
    label: "Група",
    render: (row: any) => row.group?.name ?? "",
  },
  {
    key: "pair",
    label: "Пара",
    render: (row: any) => row.classnumber?.number ?? "",
  },
  {
    key: "code",
    label: "Кодове слово",
    render: (row: any) => row.connectionCode ?? "",
  },
];