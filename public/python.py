import pandas as pd
import random
from datetime import datetime, timedelta

# Load Sentiment Data
sentiment_csv_path = 'sentimentdataset.csv'
sentiment_df = pd.read_csv(sentiment_csv_path)

# Load TikTok Data
tiktok_csv_path = 'tiktok.csv'  # Assuming this is the file name
tiktok_df = pd.read_csv(tiktok_csv_path)

# Rename TikTok columns to match Sentiment dataset structure
tiktok_df.rename(columns={
    '#': 'Unnamed: 0',
    'video_transcription_text': 'Text',
    'claim_status': 'Sentiment',  # Mapping claim_status to Sentiment (adjust if needed)
    'video_id': 'Timestamp',  # Mapping video_id to Timestamp (adjust if needed)
    'verified_status': 'User',
    'author_ban_status': 'Platform',
    'video_view_count': 'Hashtags',
    'video_like_count': 'Likes',
    'video_share_count': 'Retweets',
    'video_download_count': 'Country',
    'video_comment_count': 'Year'  # Adjusting as placeholder, TikTok may not have these values
}, inplace=True)

# Ensure TikTok dataset has all columns from Sentiment dataset
tiktok_df = tiktok_df.reindex(columns=sentiment_df.columns, fill_value=None)

# Store 'TikTok' in Platform column
tiktok_df['Platform'] = 'TikTok'

# Generate random dates for Year, Month, Day, and Hour
start_date = datetime(2023, 1, 1)
end_date = datetime(2023, 12, 31)

def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days), 
                              hours=random.randint(0, 23), 
                              minutes=random.randint(0, 59))

date_values = [random_date(start_date, end_date) for _ in range(len(tiktok_df))]

tiktok_df['Timestamp'] = [d.strftime('%m/%d/%Y %H:%M') for d in date_values]
tiktok_df['Year'] = [d.year for d in date_values]
tiktok_df['Month'] = [d.month for d in date_values]
tiktok_df['Day'] = [d.day for d in date_values]
tiktok_df['Hour'] = [d.hour for d in date_values]

# Combine both datasets
combined_df = pd.concat([sentiment_df, tiktok_df], ignore_index=True)

# Convert to JSON
json_data = combined_df.to_json(orient="records")

# Save to file
with open("data.json", "w") as json_file:
    json_file.write(json_data)

print("JSON file created successfully!")