import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {LinkedList} from "./list";


const list = new LinkedList<number>()
export const ListPage: React.FC = () => {



  const handelAddByIndex = (item: number, id: number) => {
    list.insertAt(item, id)
  }

  const handelDeleteByIndex = (id: number) => {
    list.removeAt(id)

  }


  return (
      <SolutionLayout title="Связный список">

      </SolutionLayout>
  );
};
