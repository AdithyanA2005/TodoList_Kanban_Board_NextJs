"use client";

import React, { useEffect } from "react";
import AlertContainer from "@/components/alerts/alert-container";
import AlertIcon from "@/components/alerts/alert-icon";
import AlertContent from "@/components/alerts/alert-content";
import AlertDismissButton from "@/components/alerts/alert-dismiss-button";
import { useAlertStore } from "@/lib/store/alert.stote";

export default function Index() {
  const { alerts, closeAlert, clearAlerts } = useAlertStore();

  useEffect(() => {
    // When there are only closed alerts then delete all
    const openAlerts = alerts.filter((alert) => alert.open);
    if (alerts.length !== 0 && openAlerts.length == 0) clearAlerts();
  }, [alerts]);

  return (
    <div className="z-20 space-y-1.5 fixed bottom-4 right-2 left-2 sm:right-4 sm:left-auto sm:w-full sm:max-w-md">
      {alerts.map((alert) => (
        <AlertContainer key={alert.id} type={alert.type} open={alert.open} dismiss={() => closeAlert(alert.id)}>
          <AlertIcon type={alert.type} />
          <AlertContent type={alert.type} title={alert.title} message={alert.message} />
          <AlertDismissButton type={alert.type} dismiss={() => closeAlert(alert.id)} />
        </AlertContainer>
      ))}
    </div>
  );
}
