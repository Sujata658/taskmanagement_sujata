import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import { getAllTags } from "@/apis/tags/getalltags";
import { Tag } from "@/types/Tag";

interface TagContextType {
    tags: Tag[] | [];
    setTags: (tags: Tag[]) => void;
    refreshTags: () => void;
}

const TagContext = createContext<TagContextType>({
    tags: [],
    setTags: () => {},
    refreshTags: () => {}
});

const TagProvider = ({ children }: { children: ReactNode }) => {
    const [tags, setTags] = useState<Tag[] | []>([]);

    const refreshTags = useCallback(() => {
        getAllTags()
            .then((res) => {
                
                setTags(res);
            })
            .catch((err) => {
                throw err;
            });
    }, []);

    useEffect(() => {
        refreshTags();
    }, [refreshTags]);

    return (
        <TagContext.Provider value={{ tags, setTags, refreshTags }}>
            {children}
        </TagContext.Provider>
    );
};

export const useTag = () => useContext(TagContext);

export default TagProvider;
