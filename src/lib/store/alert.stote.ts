import { create } from "zustand";
import { IAlert } from "@/types/models/alert";

interface AlertState {
  alerts: IAlert[];
  newAlert: (alert: Pick<IAlert, "message" | "type" | "title">, delay?: number) => void;
  closeAlert: (id: number) => void;
  clearAlerts: () => void;
}

export const useAlertStore = create<AlertState>((set, get) => {
  // A unique id for alerts updated on addition of new alert
  let nextAlertId: number = 0;

  return {
    alerts: [],
    newAlert: (alert, delay) => {
      // Create new alert with unique id
      const alertId = nextAlertId++;
      const newAlert = { id: alertId, open: true, ...alert };

      // Append the new alert
      set((state) => ({ alerts: [...state.alerts, newAlert] }));

      // Add a delay to clear the alert if delay is provided
      if (delay) setTimeout(() => get().closeAlert(alertId), delay);
    },
    closeAlert: (id) => {
      set((state) => ({
        alerts: state.alerts.map((alert) => {
          if (alert.id === id) return { ...alert, open: false };
          return alert;
        }),
      }));
    },
    clearAlerts: () => {
      set({ alerts: [] });
    },
  };
});
