import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRules } from "@/context/RulesContext";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { Category } from "@/types/Rules";
import updateRule from "@/apis/rules/update";
import { toast } from "sonner";

const taskStates = ["ToDo", "InProgress", "Completed"] as const;

const Settings = () => {
  const { rules, refreshRules } = useRules();
  const [transitions, setTransitions] = useState<{ [key: string]: { [key: string]: boolean } }>({});
  const [hasChanges, setHasChanges] = useState(false);



  useEffect(() => {
    if (rules.length > 0) {
      const initialTransitions: { [key: string]: { [key: string]: boolean } } = {};

      taskStates.forEach((state) => {
        initialTransitions[state] = {};
        taskStates.forEach((targetState) => {
          if (state !== targetState) {
            const isAllowed = rules[0][state]?.includes(targetState) || false;
            initialTransitions[state][targetState] = isAllowed;
          }
        });
      });

      setTransitions(initialTransitions);
    }
  }, [rules]);

  const handleCheckboxChange = (state: string, targetState: string) => {
    setTransitions((prev) => ({
      ...prev,
      [state]: {
        ...prev[state],
        [targetState]: !prev[state][targetState],
      },
    }));
    setHasChanges(true);
  };
  

  const handleUpdate = async () => {
    try {
      const formattedRules: Category = taskStates.reduce((acc, state) => {
        acc[state] = Object.keys(transitions[state]).filter((targetState) => transitions[state][targetState]);
        return acc;
      }, {} as Category);

      const response = await updateRule(formattedRules);
      if(response) {
        refreshRules();
        setHasChanges(false);
      }
      toast.success("Rules updated successfully");
      
    } catch (error) {
      toast.error((error as any).response.data.message);
    }
  };

  return (
    <div className="p-8">
      <Card className="p-6 space-y-6 shadow-xl w-full">
        <div className="flex gap-2">
          <div className="text-2xl font-bold">Settings</div>
          <Popover>
            <PopoverTrigger>
              <RxQuestionMarkCircled />
            </PopoverTrigger>
            <PopoverContent className="text-sm text-gray-600">Edit your workflow rules</PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {taskStates.map((state) => (
            <Card key={state} className="p-2 shadow-md space-y-4">
              <div className="font-semibold text-lg text-center bg-primary p-2 rounded">{state}</div>
              <div className="space-y-2 m-2">
                {taskStates
                  .filter((targetState) => targetState !== state)
                  .map((targetState) => (
                    <div key={targetState} className="flex items-center justify-between pt-2">
                      <div className="text-sm">To {targetState}</div>
                      <Switch
                        checked={transitions[state]?.[targetState] || false}
                        onCheckedChange={() => handleCheckboxChange(state, targetState)}
                      />
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button disabled={!hasChanges} onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
