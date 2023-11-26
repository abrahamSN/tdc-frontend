interface User {
  id: string;
  name: string;
  email: string;
  pass: string;
  confirmPass: string;
  created_at: string;
  updated_at: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
  user: any; // Adjust the type according to your needs
}

interface UserState {
  alertTitle: string;
  alertMessage: string;
  users: [];
  isModalOpen: boolean;
  selectedUser: null;
  openModal: (user: any) => void;
  closeModal: () => void;
  getUsers: () => void;
  getUsersById: (id: string) => void;
  storeUser: (data: Partial<User>) => void;
  updateUser: (id: string, newData: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

interface AuthState {
  isAuthenticated: boolean;
  tokenData: string;
  alertTitle: string;
  alertMessage: string;
  signIn: (email: string, password: string) => void;
  signUp: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => void;
  signOut: () => void;
}

export type { User, UserModalProps, UserState, AuthState };
