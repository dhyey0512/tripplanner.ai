import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, getFormattedDateRange } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Dispatch, SetStateAction, useState } from "react";
import { DateRange } from "react-day-picker";

type DateRangeSelectorProps = {
  onChange: (e: DateRange | undefined) => void;
  value: DateRange | undefined;
  forGeneratePlan: boolean;
};

const DateRangeSelector = ({ value, onChange, forGeneratePlan }: DateRangeSelectorProps) => {
  const [dateRangePopoverOpen, setDateRangePopoverOpen] = useState(false);

  const { isAuthenticated } = useConvexAuth(); // Get authentication status
  const router = useRouter(); // Initialize the router

  const resetControl = () => {
    onChange({ from: undefined, to: undefined });

    // Navigate to the same page as the Logo component
    const targetPath = isAuthenticated ? "/dashboard" : "/";
    router.push(targetPath);
  };

  return (
    <Popover open={dateRangePopoverOpen} onOpenChange={setDateRangePopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          size={forGeneratePlan ? "default" : "sm"}
          variant={forGeneratePlan ? "outline" : "default"}
          className={cn(
            "pl-3 text-left font-normal",
            !value && "text-muted-foreground",
            "flex justify-between",
            { "bg-foreground/50 text-background": !forGeneratePlan },
            {
              "bg-foreground": dateRangePopoverOpen && !forGeneratePlan,
            }
          )}
        >
          {value && value.from && value.to ? (
            <span className={cn({ "font-semibold": !forGeneratePlan })}>
              {getFormattedDateRange(value.from, value.to)}
            </span>
          ) : (
            <span className={cn({ "text-muted-foreground": forGeneratePlan })}>
              Pick Travel Dates
            </span>
          )}
          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          month={value?.from}
          mode="range"
          numberOfMonths={2}
          selected={value}
          onSelect={(e) => {
            onChange(e);
            if (e?.from && e.to) {
              setDateRangePopoverOpen(false);
            }
          }}
          disabled={(date) => {
            if (date) {
              return date < new Date(); // Disable past dates
            }
            return false; // Allow all dates if date is undefined
          }}
          initialFocus
        />
        <div className="w-full flex justify-end pr-5 pb-3">
          <Button onClick={resetControl}>Reset</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeSelector;
