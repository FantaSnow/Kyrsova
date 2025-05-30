import { useState } from "react";

export function useEntityDetails() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const showDetails = async (
    title: string,
    service: { getById: (id: number) => Promise<any> },
    id: number
  ) => {
    setModalTitle(title);
    setModalOpen(true);
    setLoading(true);
    try {
      const data = await service.getById(id);
      setModalData(data);
    } catch {
      setModalData({ error: "Не вдалося отримати дані" });
    } finally {
      setLoading(false);
    }
  };

  const close = () => setModalOpen(false);

  return { modalOpen, modalTitle, modalData, loading, showDetails, close };
}
