
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CreateEvent = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">Create Your Event</h1>
          <p className="text-muted-foreground mb-8">Fill out the details below to create your event</p>
          
          <Tabs defaultValue="basics" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input id="eventName" placeholder="e.g., Cloud Innovation Hackathon" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Event Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="meetup">Meetup</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Format</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">In-person</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Select start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={startDate}
                              onSelect={setStartDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "Select end date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input id="tagline" placeholder="A short, catchy description of your event" />
                      <p className="text-sm text-muted-foreground">This will appear on your event card and landing page.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe your event in detail..." className="min-h-32" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Banner</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="mb-1 font-medium">Upload an image</p>
                        <p className="text-xs text-muted-foreground mb-3">PNG, JPG or GIF, max 5MB</p>
                        <Button size="sm">Choose File</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button>Save & Continue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL (Optional)</Label>
                      <Input id="website" placeholder="https://yourevent.com" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Location Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="venue">Physical Venue</SelectItem>
                            <SelectItem value="virtual">Virtual Platform</SelectItem>
                            <SelectItem value="hybrid">Both (Hybrid)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location Details</Label>
                        <Input id="location" placeholder="Address or virtual platform link" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Event Categories (select up to 3)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {["AI & Machine Learning", "Web Development", "Mobile", "Cloud", "Blockchain", "IoT", "Data Science", "AR/VR", "Gaming", "Social Impact", "Health", "Education"].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Switch id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`} />
                            <Label htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="prizes">Prizes (Optional)</Label>
                      <Textarea id="prizes" placeholder="Describe the prizes for winners..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sponsors">Sponsors (Optional)</Label>
                      <Textarea id="sponsors" placeholder="List your event sponsors..." />
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button>Save & Continue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="registration" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Registration Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select registration type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open Registration</SelectItem>
                          <SelectItem value="approval">Approval Required</SelectItem>
                          <SelectItem value="invite">Invite Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="maxParticipants">Maximum Participants</Label>
                        <Input id="maxParticipants" type="number" placeholder="e.g., 100" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Registration Deadline</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal text-muted-foreground"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              Select deadline date
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fee">Registration Fee</Label>
                        <div className="flex items-center space-x-2">
                          <Switch id="isFree" defaultChecked />
                          <Label htmlFor="isFree">Free event</Label>
                        </div>
                      </div>
                      <Input id="fee" type="number" placeholder="0.00" disabled />
                      <p className="text-sm text-muted-foreground">For paid events, you'll need to set up payment methods in the next step.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Custom Registration Questions</Label>
                      <p className="text-sm text-muted-foreground mb-2">Add questions you want participants to answer during registration.</p>
                      <Button variant="outline" className="w-full">+ Add Question</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="collectResumes" />
                        <Label htmlFor="collectResumes">Collect Resumes/CVs from Participants</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Enable this if you want to collect resumes for recruitment purposes.</p>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button>Save & Continue</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teams" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="enableTeams" defaultChecked />
                        <Label htmlFor="enableTeams">Enable Team Formation</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Allow participants to form or join teams for your event.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="minTeamSize">Minimum Team Size</Label>
                        <Input id="minTeamSize" type="number" defaultValue="2" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxTeamSize">Maximum Team Size</Label>
                        <Input id="maxTeamSize" type="number" defaultValue="5" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="teamMatching" />
                        <Label htmlFor="teamMatching">Enable Smart Team Matching</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Help participants find team members based on skills, interests, and goals.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Team Formation Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-muted-foreground"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Select team formation deadline
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                      <p className="text-sm text-muted-foreground">After this date, team formation will be locked.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="projectSubmissions" defaultChecked />
                        <Label htmlFor="projectSubmissions">Enable Project Submissions</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Allow teams to submit their projects for review and judging.</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Project Submission Deadline</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal text-muted-foreground"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Select submission deadline
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="pt-4 flex justify-end space-x-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>Publish Event</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
