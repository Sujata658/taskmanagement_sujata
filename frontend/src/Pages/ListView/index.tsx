import { DataTable } from "@/Components/General/DataTable";
import { columns } from "./const";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStatus } from "@/context/StatusContext";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const ListView = () => {
  const { ToDOtasks, InProgresstasks, Completedtasks, refreshStatus } = useStatus();
  const [todototal, setTodototal] = useState(0);
  const [inprogresstotal, setInprogresstotal] = useState(0);
  const [completedtotal, setCompletedtotal] = useState(0);

  const location = useLocation();
  const tab = location.state ? location.state.tab : 'ToDo';

  useEffect(() => {
    refreshStatus();
  }, []);

  useEffect(() => {
    setTodototal(ToDOtasks.length);
    setInprogresstotal(InProgresstasks.length);
    setCompletedtotal(Completedtasks.length);
  }, [ToDOtasks, InProgresstasks, Completedtasks]);


  return (
    <>
      <Card className="mx-8 my-16 space-y-4 p-8 shadow-lg">
        <Tabs defaultValue={tab} className="p-2 ">
          <TabsList className="border border-gray-300 rounded-lg flex">
            <TabsTrigger value="ToDo" className="flex-1 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span>To Do</span>
                <span className=" bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">{todototal}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="InProgress" className="flex-1 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span>In Progress</span>
                <span className=" bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">{inprogresstotal}</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="Completed" className="flex-1 text-center">
              <div className="flex items-center justify-center space-x-1">
                <span>Completed</span>
                <span className=" bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">{completedtotal}</span>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ToDo">
            <div className="max-h-[55vh] overflow-y-auto">
              <DataTable columns={columns} data={ToDOtasks} />
            </div>
          </TabsContent>
          <TabsContent value="InProgress">
            <div className="max-h-[55vh] overflow-y-auto">
              <DataTable columns={columns} data={InProgresstasks} />
            </div>
          </TabsContent>
          <TabsContent value="Completed">
            <div className="max-h-[55vh] overflow-y-auto">
              <DataTable columns={columns} data={Completedtasks} />
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

export default ListView;