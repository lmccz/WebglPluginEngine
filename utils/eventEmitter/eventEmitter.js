class Event
{
    fn = undefined;
    context = undefined;
    once = false;

    constructor(fn, context, once = false) 
    {
        this.fn = fn;
        this.context = context;
        this.once = once;
    };
}


export default class EventEmitter
{
    events = Object.create(null);

    on(event, callback, context, once = false)
    {
        if (!this.events[event])
        {
            this.events[event] = [];
        }

        this.events[event].push(new Event(callback, context, once));
    }

    once(event, callback, context)
    {
        this.on(event, callback, context, true);
    }

    off(event, callback)
    {
        if (!this.events[event])
        {
            return;
        };

        // nmd item.fn 这里竟然一直没有加上fn，搞了一晚上才注意到这里
        // this.events[event].filter(item => item.fn === callback);

        if (!callback) this.events[event] = undefined;
        else
        {
            this.events[event].some((item, i) =>
            {
                if (callback === item.fn)
                {
                    this.events[event].splice(i, 1);
                    return true;
                }
            });
        };

        // return this
    }

    removeAllListeners()
    {
        this.events = Object.create(null);
    }

    emit(event, ...args) 
    {
        if (!this.events[event] || !this.events)
        {
            // console.log('no on event:', event);
            return;
        };

        this.events[event].forEach(e =>
        {
            e.fn.apply(e.context || null, args);
            if (e.once) this.off(event, e);
        });

        // const events = this.events[event];
        // 看书籍说理论上for会更快些
        // for (let i = 0; i < events.length; i++)
        // {
        //     events[i].fn.apply(events[i].context || null, args);

        //     if (events[i].once)
        //     {
        //         this.off(event, events[i]);
        //     };
        // };
    }

    destroy()
    {
        this.removeAllListeners();
    }

};

