export default defineEventHandler(async (event) => {
  console.log(`[${event._method}] ${event.path}`);
});
