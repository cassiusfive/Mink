import { useMultistepForm } from "../useMultistepForm";
import { useState, FormEvent } from "react";
import { Course } from "../shared.types";

import CourseForm from "../components/CourseForm";
import PreferenceForm from "../components/PreferenceForm";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export type FormData = {
    courses: Course[];
    prefStart: string;
    prefEnd: string;
};

const INITIAL_DATA = {
    courses: [],
    prefStart: "10:00",
    prefEnd: "16:00",
};

const ScheduleForm = () => {
    const [data, setData] = useState<FormData>(INITIAL_DATA);
    function updateFields(fields: Partial<FormData>) {
        setData((prev) => {
            return { ...prev, ...fields };
        });
    }
    const { step, next, back, isFirstStep, isLastStep } = useMultistepForm([
        <CourseForm {...data} updateFields={updateFields} />,
        <PreferenceForm {...data} updateFields={updateFields} />,
    ]);

    const navigate = useNavigate();

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) {
            return next();
        }
        navigate("/schedule/tool", { state: data });
    }

    return (
        <>
            <div className="fixed flex h-dvh w-lvw flex-col items-center justify-center bg-white sm:hidden">
                <h1 className=" text-center text-3xl">
                    <b>{"Please visit this site on a computer"}</b>
                </h1>
                <h2 className="mt-4 text-xl text-gray-700">
                    or make your screen wider
                </h2>
            </div>
            <form
                onSubmit={onSubmit}
                className="mx-auto flex h-svh w-5/6 flex-col justify-center"
            >
                {step}
                <div className="flex items-center justify-center px-10">
                    {!isFirstStep && (
                        <button
                            type="button"
                            className="group rounded-md px-4 py-2 text-blue-500 hover:text-blue-700"
                            onClick={back}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
                            ></FontAwesomeIcon>
                            <span className="mx-3">previous</span>
                        </button>
                    )}
                    <div />
                    <button
                        type="submit"
                        className="mx-3 rounded-md bg-blue-500 px-5 py-2 text-white hover:bg-blue-700"
                    >
                        {isLastStep ? "submit" : "next"}
                    </button>
                </div>
            </form>
        </>
    );
};
export default ScheduleForm;
