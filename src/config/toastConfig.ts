export const successToastConfig = {
  position: "top-right" as const,
  className: "group toast group-[.toaster]:bg-green-500 group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-lg",
};

export const errorToastConfig = {
  position: "top-right" as const,
  className: "group toast group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-none group-[.toaster]:shadow-lg",
};
