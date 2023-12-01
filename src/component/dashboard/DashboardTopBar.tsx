import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";


interface DashboardTopBarProps {
  dashboardPeriod: { startDate: Date; endDate: Date };
  updateDashboardPeriod: (date: { startDate: Date; endDate: Date }) => void;
}

function DashboardTopBar({
  dashboardPeriod,
  updateDashboardPeriod,
}: DashboardTopBarProps) {
  const handleDatePickerValueChange = (
    newValue: DateValueType,
    _?: HTMLInputElement | null | undefined
  ) => {
    if (
      !newValue ||
      typeof newValue["startDate"] !== "string" ||
      typeof newValue["endDate"] !== "string"
    )
      return;

    updateDashboardPeriod({
      startDate: new Date(newValue["startDate"]),
      endDate: new Date(newValue["endDate"]),
    });
  };


  return (
    <div className="flex items-center gap-4">
      <Datepicker
        containerClassName="w-56"
        value={dashboardPeriod}
        inputClassName="input input-bordered w-56"
        popoverDirection={"down"}
        toggleClassName="hidden"
        onChange={handleDatePickerValueChange}
        showShortcuts={true}
      />
    </div>
  );
}

export default DashboardTopBar;
