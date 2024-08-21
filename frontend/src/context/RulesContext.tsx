import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import { getRule } from "@/apis/rules/getRule"; 
import { Category } from "@/types/Rules";

interface RuleContextType {
    rules: Category[];
    setRules: (rules: Category[]) => void;
    refreshRules: () => void;
}

const RuleContext = createContext<RuleContextType>({
    rules: [],
    setRules: () => {},
    refreshRules: () => {}
});

const RuleProvider = ({ children }: { children: ReactNode }) => {
    const defaultRule: Category = {
            ToDo: ["InProgress"],
            InProgress: ["Completed"],
            Completed: ["ToDo", "InProgress"]
    };

    const [rules, setRules] = useState<Category[]>([defaultRule]);

    const refreshRules = useCallback(() => {
        getRule()
            .then((res) => {
                const fetchedRules = res; 
                if (fetchedRules.length === 0) {
                    setRules([defaultRule]);
                } else {
                    setRules([fetchedRules.rules]); 
                }
            })
            .catch(() => {
                setRules([defaultRule]);
            });
    }, []);
    

    useEffect(() => {
        refreshRules();
    }, [refreshRules]);

    return (
        <RuleContext.Provider value={{ rules, setRules, refreshRules }}>
            {children}
        </RuleContext.Provider>
    );
};

export const useRules = () => useContext(RuleContext);

export default RuleProvider;
