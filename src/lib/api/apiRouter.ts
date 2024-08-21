export const token = 'XrUorutldkzPfbw9pVcxSIZl4LGWQVhIsipFaJoV9886MAIT4uYlFHXvQ4R2G3A3hg01wMt1tsqJuKT8DhXaGJQUxmuWAuRrjPwa9AgCWDg5H6Tso9k4DUJQTXYHW'

export const apiRouter ={
    //auth
    login: `/api/${token}/UserLogin`,
    //
    calendar: `/api/${token}/LichTruc`,
    ReportStatus: `/api/${token}/ReportStatus`,
    CategoryTask: `/api/${token}/DanhMucNhiemVu`,
    lichtruc: `/api/${token}/Calendar`,
    themghichu: `/api/${token}/LogCalendar`,
    role: `api/${token}/UserRole`,
    listCalendar: `api/${token}/ListCalendar`,
    editCalendar: `api/${token}/EditCalendar`

}