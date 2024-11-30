import React, { FormEvent, useRef, useState } from "react";

import { FieldValues, useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
/*
interface FormData {
  name: string;
  age: number;
}

*/

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be atleast 3 characters." })
    .max(10),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be atleast 18!!" }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const [person, setPerson] = useState({
    name: "",
    age: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  console.log(errors);

  /*
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null && ageRef.current !== null) {
      console.log(nameRef.current.value, ageRef.current.value);
      person.name = nameRef.current.value;
      person.age = parseInt(ageRef.current.value);
      console.log(person);
    }
  };

  */
  const onSubmitHandler = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name", { required: true, minLength: 3 })}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number"
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;