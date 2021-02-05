import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Notification = {
  id: string;
  variant: "success" | "warning" | "error" | "info";
  content: string | JSX.Element;
  ttl?: number;
};

export const NotificationContext = createContext<{
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Array<Notification> | undefined>>;
}>({ notifications: [], setNotifications: () => {} });

export default function useNotification() {
  const { setNotifications } = useContext(NotificationContext);
  const remove = (id: string) =>
    setNotifications((notifications) =>
      notifications.filter((a) => a.id !== id)
    );
  const add = (notification: Notification) => {
    setNotifications((notifications) => [notification, ...notifications]);
  };

  const showErrors = (errors: { name: string; message: string }[]) =>
    setNotifications((notifications) => [
      ...errors.map(({ name, message }) => ({
        id: name + "_" + notifications.length,
        content: message,
        variant: "error" as const,
        ttl: 10,
      })),
      ...notifications,
    ]);
  return { add, remove, showErrors };
}