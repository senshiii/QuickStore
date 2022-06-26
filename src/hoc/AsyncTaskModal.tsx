import { useState } from "react";
import { useMutation } from "react-query";

const AsyncTaskModal = (NestedComponent: any, taskFunction: any) => {
  const HOCComponent = ({
    variables,
    onTaskBegin,
    onTaskSuccess,
    onTaskError,
    ...props
  }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const mutation = useMutation(taskFunction, {
      onMutate: onTaskBegin,
      onSuccess: (data: any) => {
        setIsLoading(false);
        onTaskSuccess(data);
      },
      onError: (error) => {
        setIsLoading(false);
        onTaskError();
      },
    });

    return (
      <NestedComponent
        {...props}
        isLoading={isLoading}
        onPrimaryAction={() => {
          setIsLoading(true);
          mutation.mutate(variables);
        }}
      />
    );
  };
  return HOCComponent;
};

export default AsyncTaskModal;
