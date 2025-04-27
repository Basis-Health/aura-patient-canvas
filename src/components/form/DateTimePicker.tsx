
import * as React from "react"
import { DatePicker } from "./DatePicker"
import { TimePicker } from "./TimePicker"

interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  className?: string
}

export function DateTimePicker({ value, onChange, className }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [time, setTime] = React.useState<string>(
    value ? `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}` : "00:00"
  )

  React.useEffect(() => {
    if (date && time && onChange) {
      const [hours, minutes] = time.split(':').map(Number)
      const newDate = new Date(date)
      newDate.setHours(hours, minutes)
      onChange(newDate)
    }
  }, [date, time, onChange])

  return (
    <div className={`space-y-2 ${className}`}>
      <DatePicker
        date={date}
        onSelect={setDate}
        placeholder="Pick date and time"
      />
      <TimePicker
        value={time}
        onChange={setTime}
        className="w-full"
      />
    </div>
  )
}
