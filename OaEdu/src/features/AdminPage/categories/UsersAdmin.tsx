// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   TextField,
//   Paper,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import UserService from "../../../api/services/UserService";
// import { useEntityDetails } from "../../../hooks/useEntityDetails";

// // Локальний компонент діалогу деталей
// const EntityDetailsDialog: React.FC<{
//   open: boolean;
//   title: string;
//   data: any;
//   loading: boolean;
//   onClose: () => void;
// }> = ({ open, title, data, loading, onClose }) => (
//   <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
//     <DialogTitle>{title}</DialogTitle>
//     <DialogContent>
//       <DialogContentText>
//         <pre style={{ fontSize: 14, whiteSpace: "pre-wrap" }}>
//           {loading
//             ? "Завантаження..."
//             : data
//             ? JSON.stringify(data, null, 2)
//             : "Немає даних"}
//         </pre>
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onClose}>Закрити</Button>
//     </DialogActions>
//   </Dialog>
// );

// const emptyUser = {
//   id: 0,
//   username: "",
//   email: "",
//   telegram_id: "",
//   is_active: true,
//   role: "",
// };

// type UserField = keyof typeof emptyUser;

// const UsersAdmin: React.FC = () => {
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [newUser, setNewUser] = useState<Record<UserField, any>>(emptyUser);
//   const [editingId, setEditingId] = useState<number | null>(null);

//   const entityDetails = useEntityDetails();

//   // Завантажити всіх користувачів
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await UserService.getAll(0, 100);
//       if (Array.isArray(data)) setUsers(data);
//       else if (
//         data &&
//         typeof data === "object" &&
//         Array.isArray((data as any).data)
//       )
//         setUsers((data as any).data);
//       else setUsers([]);
//     } catch {
//       setError("Помилка завантаження користувачів");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Створити/оновити користувача
//   const handleSave = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (editingId !== null) {
//         // await UserService.update({ ...newUser, id: editingId });
//       } else {
//         await UserService.register(newUser);
//       }
//       setNewUser(emptyUser);
//       setEditingId(null);
//       fetchUsers();
//     } catch {
//       setError(
//         editingId !== null
//           ? "Помилка оновлення користувача"
//           : "Помилка створення користувача"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Видалити користувача (наприклад, бан)
//   const handleDelete = async (id: number) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await UserService.banUser(id);
//       fetchUsers();
//     } catch {
//       setError("Помилка видалення користувача");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Тестування UserService
//       </Typography>
//       {loading && <CircularProgress />}
//       {error && <Typography color="error">{error}</Typography>}

//       {/* Форма створення/редагування */}
//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6">Створити/оновити користувача</Typography>
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
//           <TextField
//             label="Username"
//             value={newUser.username}
//             onChange={(e) =>
//               setNewUser({ ...newUser, username: e.target.value })
//             }
//             size="small"
//             fullWidth
//             sx={{ minWidth: 200, flex: "1 1 200px" }}
//           />
//           <TextField
//             label="Email"
//             value={newUser.email}
//             onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//             size="small"
//             fullWidth
//             sx={{ minWidth: 200, flex: "1 1 200px" }}
//           />
//           <TextField
//             label="Telegram ID"
//             value={newUser.telegram_id}
//             onChange={(e) =>
//               setNewUser({ ...newUser, telegram_id: e.target.value })
//             }
//             size="small"
//             fullWidth
//             sx={{ minWidth: 200, flex: "1 1 200px" }}
//           />
//           <FormControl
//             fullWidth
//             size="small"
//             sx={{ minWidth: 200, flex: "1 1 200px" }}
//           >
//             <InputLabel>Роль</InputLabel>
//             <Select
//               value={newUser.role}
//               label="Роль"
//               onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//             >
//               <MenuItem value="user">User</MenuItem>
//               <MenuItem value="admin">Admin</MenuItem>
//               {/* Додайте інші ролі за потреби */}
//             </Select>
//           </FormControl>
//         </Box>
//         <Button variant="contained" onClick={handleSave} sx={{ mt: 2, mr: 2 }}>
//           {editingId !== null ? "Зберегти зміни" : "Створити користувача"}
//         </Button>
//         {editingId !== null && (
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => {
//               setNewUser(emptyUser);
//               setEditingId(null);
//             }}
//             sx={{ mt: 2 }}
//           >
//             Скасувати редагування
//           </Button>
//         )}
//       </Paper>

//       {/* Таблиця користувачів */}
//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Typography variant="h6" sx={{ mb: 1 }}>
//           Всі користувачі
//         </Typography>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Username</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Telegram ID</TableCell>
//               <TableCell>Роль</TableCell>
//               <TableCell>Активний</TableCell>
//               <TableCell>Дії</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user: any) => (
//               <TableRow key={user.id}>
//                 <TableCell>
//                   <span
//                     style={{
//                       color: "#1976d2",
//                       cursor: "pointer",
//                       textDecoration: "underline",
//                     }}
//                     onClick={() =>
//                       entityDetails.showDetails(
//                         "Користувач",
//                         UserService,
//                         user.id
//                       )
//                     }
//                   >
//                     {user.id}
//                   </span>
//                 </TableCell>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.telegram_id}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.is_active ? "Так" : "Ні"}</TableCell>
//                 <TableCell>
//                   <Button
//                     size="small"
//                     variant="outlined"
//                     onClick={() => {
//                       setNewUser({ ...emptyUser, ...user });
//                       setEditingId(user.id);
//                     }}
//                     sx={{ mr: 1 }}
//                   >
//                     Оновити
//                   </Button>
//                   <Button
//                     size="small"
//                     color="error"
//                     variant="outlined"
//                     onClick={() => handleDelete(user.id)}
//                   >
//                     Видалити
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* Модальне вікно для деталей */}
//       <EntityDetailsDialog
//         open={entityDetails.modalOpen}
//         title={entityDetails.modalTitle}
//         data={entityDetails.modalData}
//         loading={entityDetails.loading}
//         onClose={entityDetails.close}
//       />
//     </Box>
//   );
// };

// export default UsersAdmin;
