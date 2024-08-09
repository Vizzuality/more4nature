import { SupabaseClient } from '@supabase/supabase-js';

import { Event } from './events.service';

export class EventsRepository {
  private supabase: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    this.supabase = supabaseClient;
  }

  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await this.supabase.from('events').select('*').returns<Event[]>();
    if (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
    return data;
  }

  async getPastEvents(filters?: Partial<Event>): Promise<Event[]> {
    let query = this.supabase.from('events').select('*').lt('date', 'NOW()');
    // TODO: Cannot extract this to a private method because of type errors
    if (filters?.location) {
      query.eq('location', filters.location);
    }
    if (filters?.date) {
      query.eq('date', filters.date);
    }
    if (filters?.name) {
      query = query.ilike('name', `%${filters.name}%`);
    }
    const { data, error } = await query.returns<Event[]>();

    if (error) {
      throw new Error(`Error fetching past events: ${error.message}`);
    }
    return data;
  }

  async getFutureEvents(filters?: Partial<Event>): Promise<Event[]> {
    let query = this.supabase.from('events').select('*').gt('date', 'NOW()');
    // TODO: Cannot extract this to a private method because of type errors
    if (filters?.location) {
      query.eq('location', filters.location);
    }
    if (filters?.date) {
      query.eq('date', filters.date);
    }
    if (filters?.name) {
      query = query.ilike('name', `%${filters.name}%`);
    }
    const { data, error } = await query.returns<Event[]>();

    if (error) {
      throw new Error(`Error fetching future events: ${error.message}`);
    }
    return data;
  }

  async getEventById(id: string) {
    const { data, error } = await this.supabase.from('events').select('*').eq('id', id).single();
    if (error) {
      throw new Error(`Error fetching event with ID ${id}: ${error.message}`);
    }
    return data;
  }

  async createEvent(event: {
    name: string;
    description: string;
    date: string;
    image: string;
    location: string;
  }) {
    const { data, error } = await this.supabase.from('events').insert([event]);
    if (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
    return data;
  }

  async updateEvent(
    id: string,
    updatedEvent: {
      name?: string;
      description?: string;
      date?: string;
      image?: string;
      location?: string;
    },
  ) {
    const { error } = await this.supabase.from('events').update(updatedEvent).eq('id', id);
    if (error) {
      throw new Error(`Error updating event with ID ${id}: ${error.message}`);
    }
  }

  async deleteEvent(id: string) {
    const { error } = await this.supabase.from('events').delete().eq('id', id);
    if (error) {
      throw new Error(`Error deleting event with ID ${id}: ${error.message}`);
    }
  }
}
