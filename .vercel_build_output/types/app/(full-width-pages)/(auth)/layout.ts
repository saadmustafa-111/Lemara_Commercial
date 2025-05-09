export interface PageProps {
  params?: Promise<Record<string, string | string[] | undefined>>
  searchParams?: Promise<any>
}

export interface LayoutProps {
  children?: React.ReactNode
  params?: Promise<Record<string, string | string[] | undefined>>
}
