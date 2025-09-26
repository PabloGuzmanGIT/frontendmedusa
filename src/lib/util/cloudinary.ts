// src/lib/util/cloudinary.ts
export function cld(url?: string, t = "f_auto,q_auto") {
  return url ? url.replace("/upload/", `/upload/${t}/`) : ""
}
