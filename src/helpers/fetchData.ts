export type TBackup = {
  id: string
  title: string
  date: string
  size_mb: string
};

export const fetchBackups = async () => {

  try {
    const response = await fetch("backups.json");

    const backups: TBackup[] = await response.json();

    if (backups) {
      return backups
    }

    else return null

  } catch (error) {
    console.error(error)
    throw new Error()
  }
}