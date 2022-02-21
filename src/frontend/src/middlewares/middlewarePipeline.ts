import { FMiddleware, IMiddlwareContext } from "@/common/types";

function middlewarePipeline(
  context: IMiddlwareContext,
  middlewares: FMiddleware[],
  index: number
) {
  const nextMiddleware = middlewares[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    const nextPipeline = middlewarePipeline(context, middlewares, index + 1);
    nextMiddleware({
      ...context,
      nextMiddleware: nextPipeline,
    });
  };
}

export default middlewarePipeline;
