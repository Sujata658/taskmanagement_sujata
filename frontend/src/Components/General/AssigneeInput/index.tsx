import { useState, useEffect, KeyboardEvent } from "react";
import { User as Assignee } from "@/types/User";
import { getAllUsers } from "@/apis/users/getAll";

interface AssigneeInputProps {
  selectedAssignees: { id: string; displayName: string }[];
  setSelectedAssignees: (assignee: { id: string; displayName: string }[]) => void;
}

const AssigneeInput: React.FC<AssigneeInputProps> = ({ selectedAssignees, setSelectedAssignees }) => {
  const [assignees, setAssignees] = useState<Assignee[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredAssignees, setFilteredAssignees] = useState<Assignee[]>([]);
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAssignees(users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAssigneeClick = (assignee: Assignee) => {
    const displayName = `${assignee.name} (${assignee.email})`;
    setSelectedAssignees([...selectedAssignees, { id: assignee._id, displayName }]);
    setInputValue('');
  };

  const handleAssigneeRemove = (id: string) => {
    setSelectedAssignees(selectedAssignees.filter((assignee) => assignee.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && !filteredAssignees.length) {
      if (!selectedAssignees.some((assignee) => assignee.displayName === inputValue.trim())) {
        setSelectedAssignees([...selectedAssignees, { id: '', displayName: inputValue.trim() }]);
        setInputValue('');
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (inputValue) {
      const temp = assignees.filter((assignee) =>
        assignee.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        assignee.email.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredAssignees(temp);
    } else {
      setFilteredAssignees([]);
    }
  }, [inputValue, assignees]);

  return (
    <div>
      <label className="block text-sm font-medium">Assignees</label>
      <input
        className="mt-1 block w-full border border-gray-600 p-2 rounded-md bg-background"
        placeholder="Assignees (Press Enter to add)"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setTimeout(() => setIsInputActive(false), 200)}
        onKeyDown={handleKeyDown}
      />
      {isInputActive && filteredAssignees.length > 0 && (
        <div className="border border-gray-300 rounded-md mt-1 p-2">
          {filteredAssignees.map((assignee) => (
            <div
              key={assignee._id}
              className="cursor-pointer p-1 hover:bg-gray-200 hover:text-background rounded-md"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAssigneeClick(assignee)}
            >
              {assignee.name} ({assignee.email})
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedAssignees.map((assignee) => (
          <div key={assignee.id} className="flex items-center bg-background border rounded-full px-3 py-1 text-sm font-semibold text-foreground">
            {assignee.displayName}
            <button
              type="button"
              className="ml-2 text-gray-600"
              onClick={() => handleAssigneeRemove(assignee.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssigneeInput;
