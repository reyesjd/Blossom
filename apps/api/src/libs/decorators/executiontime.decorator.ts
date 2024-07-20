import { performance } from 'perf_hooks';

export function LogExecutionTime() {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = performance.now();

      const result = await method.apply(this, args);

      const end = performance.now();
      console.log(`Execution time ${propertyName}: ${end - start} ms`);

      return result;
    };

    return descriptor;
  };
}
