"use client";
import CategorizedListFunctions, {
  CategorizedListNotesFunctions,
} from "@/functions/categorizedList";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import WidgetWrapper from "./WidgetWrapper";
import { Disclosure } from "@headlessui/react";
import GhostInput from "./GhostInput";
import { signal } from "@preact/signals-react";

export default function CategorizedListWidget() {
  const [categories, setCategories] = useState<any[]>([]);
  const stateSignal = signal({});

  const functions = new CategorizedListFunctions(stateSignal);

  useEffect(() => {
    functions.getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <WidgetWrapper title="Categorized List">
      <GhostInput
        placeholder="+ Add a new category"
        action={functions.addCategory}
      />
      {categories.map((category: any) => {
        return (
          <Category key={category.id} name={category.name} id={category.id} />
        );
      })}
    </WidgetWrapper>
  );
}

export function Category(props: any) {
  let { name, id } = props;

  let openNotesRef = useRef<HTMLButtonElement>(null);

  const expandChildren = () => {
    openNotesRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center py-2">
        <ChevronDownIcon
          className="h-3 w-3 mr-2 cursor-pointer"
          onClick={expandChildren}
        />
        {name}
      </div>
      <Disclosure>
        <Disclosure.Button ref={openNotesRef} />
        <Disclosure.Panel className="ml-5">
          <NotesList id={id} />
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export function NotesList(props: any) {
  let { id } = props;
  const notes = signal([]);
  const functions = new CategorizedListNotesFunctions(notes, id);

  useEffect(() => {
    functions.getNotes();
  }, []);

  return (
    <div>
      <GhostInput placeholder="+ Add a new note" action={functions.addNote} />
      {notes.value.map((note: any) => {
        return <Note key={note.id} name={note.name} id={note.id} />;
      })}
    </div>
  );
}

export function Note(props: any) {
  let { name, id } = props;
  return <div className="flex flex-row items-center py-2">{name}</div>;
}
