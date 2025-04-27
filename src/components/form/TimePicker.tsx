
import * as React from "react"
import { Clock } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  // Generate time options every 30 minutes
  const timeOptions = React.useMemo(() => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const h = hour.toString().padStart(2, '0')
        const m = minute.toString().padStart(2, '0')
        options.push(`${h}:${m}`)
      }
    }
    return options
  }, [])

  const formatTimeDisplay = (time: string) => {
    const [hour, minute] = time.split(':')
    const h = parseInt(hour)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const hour12 = h % 12 || 12
    return `${hour12}:${minute} ${ampm}`
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <Clock className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((time) => (
          <SelectItem key={time} value={time}>
            {formatTimeDisplay(time)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
