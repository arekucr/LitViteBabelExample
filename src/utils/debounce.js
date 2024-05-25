const debounceHandler = (localState) =>
  function dh(...args) {
    localState.instance = this;
    clearTimeout(localState?.timeout);
    localState.timeout = setTimeout(() => localState?.fn.apply(localState?.instance, args), localState?.config?.time);
  };

export const debounce =
  (time = 0) =>
  (descriptor) => {
    const localState = {
      node: null,
      fn: descriptor.initializer || descriptor.descriptor.value,
      config: { time },
    };

    delete descriptor./* The `initializer` property in the code snippet is used to access the initial
    value of a class property. In this specific context, it is used to access the
    initial value of the function that is being debounced. The `initializer`
    property is used to set the `fn` property of the `localState` object to the
    initial value of the function defined in the class method being decorated with
    the `debounce` decorator. */
    initializer;
    return {
      ...descriptor,
      kind: 'method',
      placement: 'own',
      descriptor: { value: debounceHandler(localState) },
    };
  };
