"use client";

import { useEffect, useState } from "react";
import type { PersonalReminder } from "@/types";

const STORAGE_KEY = "lembretes_fisuma";

/** Personal reminders persisted in localStorage (private to the device). */
export function usePersonalReminders() {
  const [reminders, setReminders] = useState<PersonalReminder[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReminders(JSON.parse(raw) as PersonalReminder[]);
    } catch {
      // Corrupt/unavailable storage: start empty.
    }
  }, []);

  function persist(next: PersonalReminder[]) {
    setReminders(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function add(reminder: Omit<PersonalReminder, "id">) {
    persist([...reminders, { ...reminder, id: `r-${Date.now()}` }]);
  }

  function remove(id: string) {
    persist(reminders.filter((r) => r.id !== id));
  }

  return { reminders, add, remove };
}
