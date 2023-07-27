type DateStyle = Intl.DateTimeFormatOptions["dateStyle"];

export const formatDate = (
  date: string,
  dateStyle: DateStyle = "medium",
  locales = "en"
) => {
  const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return formatter.format(new Date(date));
};

export const extractHeadingFromMarkdown = (markdown: string) => {
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const matches = markdown.match(headingRegex);

  const headings: string[] = [];
  if (matches) {
    matches.forEach((match) => {
      const headingText = match.replace(/<\/?[^>]+(>|$)/g, "");
      headings.push(headingText);
    });
  }

  return headings;
};
