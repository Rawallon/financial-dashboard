import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import { Dispatch, SetStateAction } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

import { FilterProperties, selectableProperties } from "@/app/dashboard/page";
import { SelectablePropertiesType } from "@/utils/types";

import Dropdown, { DropdownToggableChildren } from "../Dropdown";
import InputText from "../InputText";

interface DashboardTopBarProps {
  dashboardPeriod: { startDate: Date; endDate: Date };
  updateDashboardPeriod: (date: { startDate: Date; endDate: Date }) => void;
  filterProperties: FilterProperties<{ min: null; max: null }>;
  setFilterProperties: Dispatch<
    SetStateAction<FilterProperties<{ min: null; max: null }>>
  >;
}

function DashboardTopBar({
  dashboardPeriod,
  updateDashboardPeriod,
  filterProperties,
  setFilterProperties,
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

  function changeFilterProperties(
    newValue: string,
    propertyName: string,
    propertyAttributeName: string | undefined = undefined
  ) {
    if (propertyAttributeName) {
      setFilterProperties({
        ...filterProperties,
        [propertyName]: {
          ...(filterProperties[
            propertyName as keyof FilterProperties<{ min: null; max: null }>
          ] as { min: null; max: null }),
          [propertyAttributeName]: newValue,
        },
      });
    } else {
      setFilterProperties({
        ...filterProperties,
        [propertyName]: newValue,
      });
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        titleNode={
          <div className="flex items-center gap-2">
            <div className="w-6">
              <FunnelIcon />
            </div>
            <span>More Filters</span>
          </div>
        }
      >
        <DropdownToggableChildren title="By group">
          {selectableProperties.map((property, k) => (
            <label className="label cursor-pointer" key={k}>
              <span className="label-text">{property["name"]}</span>
              <input
                type="radio"
                name="group-by"
                className="radio checked:bg-primary-500"
                onChange={(e) =>
                  changeFilterProperties(
                    e.target.value as SelectablePropertiesType,
                    "group"
                  )
                }
                value={property["value"]}
                checked={property["value"] == filterProperties["group"]}
              />
            </label>
          ))}
        </DropdownToggableChildren>

        <DropdownToggableChildren title="# of withdraws">
          <div>
            <InputText
              labelTitle="Min"
              type="number"
              value={filterProperties.withdraw?.min || ""}
              placeholder="Type here"
              onChange={(e) => {
                changeFilterProperties(e.target.value, "withdraw", "min");
              }}
            />
          </div>
          <div className="divider"></div>
          <div>
            <InputText
              labelTitle="Max"
              type="number"
              value={filterProperties.withdraw?.max || ""}
              placeholder="Type here"
              onChange={(e) => {
                changeFilterProperties(e.target.value, "withdraw", "max");
              }}
            />
          </div>
        </DropdownToggableChildren>

        <DropdownToggableChildren title="# of deposits">
          <div>
            <InputText
              labelTitle="Min"
              type="number"
              value={filterProperties.deposit?.min || ""}
              placeholder="Type here"
              onChange={(e) => {
                changeFilterProperties(e.target.value, "deposit", "min");
              }}
            />
          </div>
          <div className="divider"></div>
          <div>
            <InputText
              labelTitle="Max"
              type="number"
              value={filterProperties.deposit?.max || ""}
              placeholder="Type here"
              onChange={(e) => {
                changeFilterProperties(e.target.value, "deposit", "max");
              }}
            />
          </div>
        </DropdownToggableChildren>

        <DropdownToggableChildren title="Profit">
          <div>
            <InputText
              labelTitle="Min"
              type="number"
              value={filterProperties.profit?.min || ""}
              placeholder="Type here"
              onChange={(e) => {
                changeFilterProperties(e.target.value, "profit", "min");
              }}
            />
          </div>
          <div className="divider"></div>
          <div>
            <InputText
              labelTitle="Max"
              type="number"
              value={filterProperties.profit?.max || ""}
              placeholder="Type here"
              onChange={(e) => {
                changeFilterProperties(e.target.value, "profit", "max");
              }}
            />
          </div>
        </DropdownToggableChildren>
      </Dropdown>
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
