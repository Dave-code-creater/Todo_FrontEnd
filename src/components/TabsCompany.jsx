import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import {GroupTable} from './TableGroups';
import Example from '../components/AddCompany';

export function TabsWithIcon() {
  const data = [
    {
      label: "Nhóm của bạn",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      component: <GroupTable />,
    },
    {
      label: "Tạo nhóm mới",
      value: "profile",
      icon: UserCircleIcon,
      component: <Example />,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      component: (        <div><h2>Settings Page</h2><p>Customize your preferences here.</p></div>
      ),
    },
  ];
  return (
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, component }) => (
          <TabPanel key={value} value={value}>
            {component}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}