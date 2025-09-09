'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format, parse, isValid } from 'date-fns';

interface DateInputFieldsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: Date;
  onChange?: (date?: Date) => void;
}

export const DateInputFields = forwardRef<HTMLDivElement, DateInputFieldsProps>(
  ({ value, onChange, ...props }, ref) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const dayRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (value && isValid(value)) {
        setDay(format(value, 'dd'));
        setMonth(format(value, 'MM'));
        setYear(format(value, 'yyyy'));
      } else {
        setDay('');
        setMonth('');
        setYear('');
      }
    }, [value]);

    const updateDate = () => {
      if (day.length === 2 && month.length === 2 && year.length === 4) {
        const dateString = `${day}/${month}/${year}`;
        const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());

        if (isValid(parsedDate) && onChange) {
          onChange(parsedDate);
        } else if (onChange) {
          onChange(undefined); // Clear date if invalid
        }
      } else if (onChange) {
        onChange(undefined); // Clear date if not fully entered
      }
    };

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
      setDay(val);
      if (val.length === 2 && monthRef.current) {
        monthRef.current.focus();
      }
      updateDate();
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
      setMonth(val);
      if (val.length === 2 && yearRef.current) {
        yearRef.current.focus();
      }
      updateDate();
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
      setYear(val);
      updateDate();
    };

    return (
      <div ref={ref} className={cn("flex space-x-2", props.className)}>
        <Input
          ref={dayRef}
          placeholder="DD"
          value={day}
          onChange={handleDayChange}
          maxLength={2}
          className="w-16 text-center"
          {...props}
        />
        <span className="text-lg">/</span>
        <Input
          ref={monthRef}
          placeholder="MM"
          value={month}
          onChange={handleMonthChange}
          maxLength={2}
          className="w-16 text-center"
        />
        <span className="text-lg">/</span>
        <Input
          ref={yearRef}
          placeholder="YYYY"
          value={year}
          onChange={handleYearChange}
          maxLength={4}
          className="w-24 text-center"
        />
      </div>
    );
  }
);

DateInputFields.displayName = 'DateInputFields';
