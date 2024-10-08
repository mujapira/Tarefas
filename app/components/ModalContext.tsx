"use client"

import React, { createContext, useContext, useState } from "react"
import DeletionModal from "./modal/DeletionModal"
import SessionModal from "./modal/SessionModal"

type ModalType = "session" | "deletion" | null

export interface DeletionModalPayload {
  taskId: string
}

type ModalPayload = DeletionModalPayload | null

interface ModalContextType {
  openModal: (type: ModalType, payload?: ModalPayload) => void
  closeModal: () => void
  modalType: ModalType
  modalPayload?: ModalPayload
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null)
  const [modalPayload, setModalPayload] = useState<ModalPayload>(null)

  const openModal = (type: ModalType, payload?: ModalPayload) => {
    setModalType(type)
    if (payload) setModalPayload(payload)
  }

  const closeModal = () => {
    setModalType(null)
    setModalPayload(null)
  }

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, modalType, modalPayload }}>
      {children}

      {modalType === "session" && <SessionModal closeModal={closeModal} />}

      {modalType === "deletion" && (
        <DeletionModal
          closeModal={closeModal}
          payload={modalPayload as DeletionModalPayload}
        />
      )}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
