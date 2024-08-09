import { NextRequest, NextResponse } from 'next/server';

import { EventsRepository } from '@/lib/events.repository';
import { EventsService } from '@/lib/events.service';

import events from '@/data/events';

import { createServerSideClient } from '@/db/server.db';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const repo = new EventsRepository(createServerSideClient());
  const { filters } = EventsService.extractFilters(searchParams);
  const eventsService = new EventsService(events, filters, repo);
  const data = {
    upcoming: await eventsService.getUpcomingEvents(),
    past: await eventsService.getPastEvents(),
  };
  return NextResponse.json({ data });
}
