export type TBackup = {
  id: string
  title: string
  date: string
  size_mb: string
};

export type TProject = {
  id: string
  name: string
};

export const fetchBackups = async () => {

  try {
    const response = await fetch("backups.json");

    const backups: TBackup[] = await response.json();

    if (backups) {
      return backups
    }

    else return []

  } catch (error) {
    console.error(error)
    throw new Error()
  }
}

export const fetchProjects = async () => {

  try {
    const response = await fetch("projects.json");

    const projects: TProject[] = await response.json();

    if (projects) {
      return projects
    }

    else return []

  } catch (error) {
    console.error(error)
    throw new Error()
  }
}