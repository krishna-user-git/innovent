
export const Testimonials = () => {
  const testimonials = [
    {
      quote: "InnoVent completely transformed how we run our university hackathons. The team formation feature helped students collaborate better than ever before.",
      author: "Alex Rodriguez",
      title: "CS Professor, Stanford University",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      quote: "As a first-time hackathon organizer, InnoVent made the entire process so simple. We had over 300 participants and the platform scaled perfectly.",
      author: "Michelle Chang",
      title: "Community Manager, TechStart",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      quote: "The recruitment features helped us discover amazing talent. We ended up hiring three engineers from the last hackathon we sponsored!",
      author: "David Kim",
      title: "Technical Recruiter, Innovate Inc",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gold/20 px-3 py-1 text-sm text-gold">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">What Our Users Say</h2>
            <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what organizers and participants say about InnoVent.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col gap-4 p-6 bg-gray-900 rounded-lg shadow-sm border border-gray-800">
              <div className="flex-1">
                <p className="italic text-gray-400">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="rounded-full h-12 w-12 object-cover"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
