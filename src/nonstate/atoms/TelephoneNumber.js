const LEN_LOCAL = 10;

const INT_PART_TO_FLAG = {
  94: "🇱🇰",
  91: "🇮🇳",
  44: "🇬🇧🇰",
  1: "🇺🇸🇰",
  61: "🇦🇺🇰",
};

export default function TelephoneNumber({ value }) {
  value = value.replaceAll(" ", "");
  const n = value.length;
  const localPart = value.substring(n - LEN_LOCAL, n);

  let interPart = value.substring(0, n - LEN_LOCAL);
  interPart = interPart.replace("+", "");
  interPart = interPart.replace("00", "");

  if (interPart === "") {
    interPart = "94";
  }

  let flag = INT_PART_TO_FLAG[interPart];

  return (
    flag +
    "+" +
    interPart +
    " " +
    localPart.substring(0, 3) +
    " " +
    localPart.substring(3, 6) +
    " " +
    localPart.substring(6, 10)
  );
}
