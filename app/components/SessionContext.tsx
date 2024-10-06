"use client"

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react"
import { sessionService } from "../services/sessionService"

type SessionContextType = {
  sessionId: string | null
  isSessionValid: boolean
  createSession: () => Promise<boolean>
  checkSession: () => Promise<void>
  retrieveSession: (sessionId: string) => Promise<boolean>
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const SessionProvider = ({
  children,
  initialSessionId,
}: {
  children: React.ReactNode
  initialSessionId: string | null
}) => {
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId)
  const [isSessionValid, setIsSessionValid] = useState<boolean>(false)

  const checkSession = async () => {
    const isValid = await sessionService.checkSessionValidity()
    setIsSessionValid(isValid)
  }

  const retrieveSession = async (sessionId: string) => {
    const retrievedSessionId = await sessionService.retrieveSession(sessionId)
    setSessionId(retrievedSessionId)
    setIsSessionValid(true)
    return !!retrievedSessionId
  }

  const createSession = async () => {
    const newSessionId = await sessionService.createSession()
    setSessionId(newSessionId)
    return !!newSessionId
  }

  useEffect(() => {
    if (sessionId) {
      checkSession()
    }
  }, [sessionId])

  const value = useMemo(
    () => ({
      sessionId,
      isSessionValid,
      createSession,
      checkSession,
      retrieveSession,
    }),
    [sessionId, isSessionValid]
  )

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
