from app.data_access.database import getCollection



reports_collections  = getCollection("reports")



async def get_all_reports():
    reports = await reports_collections.find({}).to_list(None)
    return reports

